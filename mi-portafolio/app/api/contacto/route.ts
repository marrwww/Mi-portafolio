import { NextResponse } from "next/server";
import { Resend } from "resend";

// Registro simple en memoria para limitar envíos por IP (anti-spam)
const intentosPorIp = new Map<string, { conteo: number; ultimoIntento: number }>();

function limpiarTexto(texto: string): string {
  return texto
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .trim();
}

export async function POST(request: Request) {
  try {
    const apiKey = process.env.RESEND_API_KEY;
    const destino = process.env.MI_CORREO_DESTINO;

    if (!apiKey || !destino) {
      return NextResponse.json(
        { error: "Falta configurar RESEND_API_KEY o MI_CORREO_DESTINO en .env.local." },
        { status: 500 }
      );
    }

    const resend = new Resend(apiKey);

    // 1. Protección básica contra spam (máximo 3 correos cada 10 minutos por IP)
    const ip = request.headers.get("x-forwarded-for") ?? "ip-local";
    const ahora = Date.now();
    const registro = intentosPorIp.get(ip);

    if (registro && ahora - registro.ultimoIntento < 10 * 60 * 1000) {
      if (registro.conteo >= 3) {
        return NextResponse.json(
          { error: "Demasiados intentos. Intenta de nuevo en unos minutos." },
          { status: 429 }
        );
      }
      registro.conteo += 1;
      registro.ultimoIntento = ahora;
    } else {
      intentosPorIp.set(ip, { conteo: 1, ultimoIntento: ahora });
    }

    // 2. Leer y validar el cuerpo de la petición
    const body = await request.json();
    const { nombre, email, mensaje, empresa } = body;

    // Campo trampa (honeypot): si un bot llenó este campo oculto, respondemos ok sin enviar
    if (empresa) {
      return NextResponse.json({ ok: true }, { status: 200 });
    }

    if (!nombre || !email || !mensaje) {
      return NextResponse.json(
        { error: "Todos los campos son obligatorios." },
        { status: 400 }
      );
    }

    const emailValido = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    if (!emailValido) {
      return NextResponse.json(
        { error: "El formato del correo electrónico no es válido." },
        { status: 400 }
      );
    }

    if (mensaje.length > 2000 || nombre.length > 100) {
      return NextResponse.json(
        { error: "El mensaje excede el límite de caracteres permitido." },
        { status: 400 }
      );
    }

    // 3. Sanitizar entradas antes de enviar
    const nombreSeguro = limpiarTexto(nombre);
    const emailSeguro = limpiarTexto(email);
    const mensajeSeguro = limpiarTexto(mensaje);

    // 4. Enviar el correo real mediante Resend
    const { error } = await resend.emails.send({
      from: "Portafolio Ocean <onboarding@resend.dev>",
      to: destino,
      replyTo: emailSeguro,
      subject: `Nuevo mensaje en tu portafolio de ${nombreSeguro}`,
      html: `
        <div style="font-family: sans-serif; color: #0f3d62; line-height: 1.6;">
          <h2>Nuevo mensaje desde tu Portafolio</h2>
          <p><strong>Nombre:</strong> ${nombreSeguro}</p>
          <p><strong>Correo:</strong> ${emailSeguro}</p>
          <p><strong>Mensaje:</strong></p>
          <p style="background: #f0f9ff; padding: 12px; border-radius: 8px;">${mensajeSeguro}</p>
        </div>
      `,
    });

    if (error) {
      return NextResponse.json(
        { error: error.message || "No se pudo enviar el correo en este momento." },
        { status: 500 }
      );
    }

    return NextResponse.json({ ok: true }, { status: 200 });
  } catch {
    return NextResponse.json(
      { error: "Error procesando la solicitud." },
      { status: 500 }
    );
  }
}