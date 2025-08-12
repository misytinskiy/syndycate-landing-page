// app/api/leads/route.js
export async function POST(req) {
  try {
    const body = await req.json();

    const url = process.env.GAS_WEBAPP_URL;

    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    const data = await res.json().catch(() => ({}));
    if (!res.ok || data.ok === false) {
      return new Response(
        JSON.stringify({ ok: false, error: data.error || "GAS error" }),
        { status: 500 }
      );
    }

    return new Response(JSON.stringify({ ok: true }), { status: 200 });
  } catch (e) {
    return new Response(JSON.stringify({ ok: false, error: String(e) }), {
      status: 500,
    });
  }
}
