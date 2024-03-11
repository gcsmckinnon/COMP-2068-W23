import APIProvider from "../utilities/APIProvider.js";

const CardService = (async () => {
    const apiProvider = await APIProvider();

    return {
        index: async () => {
            try {                
                const cards = await apiProvider.get("/cards");

                return cards.data?.cards || [];
            } catch (error) {
                throw error;
            }
        },

        show: async (id) => {
            try {
                const card = await apiProvider.get(`/cards/${id}`);

                return card.data?.card || {};
            } catch (error) {
                throw error;
            }
        },
    };
})();

export default CardService;