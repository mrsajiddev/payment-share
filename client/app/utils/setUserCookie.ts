export async function setUserCookie(payload: {token: string; user: {}}) {

    console.log(payload, ">>>> cookie payload");
    const login = await fetch("/api/auth/set-cookie", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
            token: payload.token,
            user: payload.user
        })
    });

    return login;
}