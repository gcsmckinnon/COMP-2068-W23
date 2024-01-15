// Creates a controller action called "home"
export const home = (_, res) => {
    // Renders our home page view
    res.render("pages/home");
};

// Creates a controller action called "insult"
export const insult = async (_, res, next) => {
    try {
        const insult = await fetchInsult();

        res.render("pages/insult", { insult: insult });
    } catch(error) {
        // Sets our HTTP status code
        error.status = 500;

        // Triggers the error handler and passes the error
        next(error);
    }
};

/**
 * Fetches an insult from teh Matt Bas insult generator API
 * 
 * @returns <string> random insult
 */
async function fetchInsult() {
    const insultURL = "https://insult.mattbas.org/api/insult";
    const response = await fetch(insultURL);
    const insult = await response.text();

    return insult;
}
