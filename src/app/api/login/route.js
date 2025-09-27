export async function POST(req) {
    try {
      const body = await req.json();
      const { email, password } = body;
  
      const apiRes = await fetch("https://api.redseam.redberryinternship.ge/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({ email, password }),
      });
  
      const data = await apiRes.json();
      return new Response(JSON.stringify(data), { status: apiRes.status });
    } catch (error) {
      return new Response(JSON.stringify({ message: error.message }), { status: 500 });
    }
  }