export const home = (_, res) => {
    res.render("pages/home");
};

export const insult = async (_, res, next) => {
    try {
        const insult = await fetchInsult();

        res.render("pages/insult", { insult: insult });
    } catch(error) {
        error.status = 500;
        next(error);
    }
};

async function fetchInsult() {
    const insultURL = "https://insult.mattbas.org/api/insult";
    const response = await fetch(insultURL);
    const insult = await response.text();

    return insult;
}
