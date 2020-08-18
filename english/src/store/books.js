export default {
    state: {
        books:[
            {
                id: 'a1',
                title: 'The Tortoise And The Hare',
                description: 'Черепаха и Заяц',
                imageId: 'https://images-na.ssl-images-amazon.com/images/I/61FWyLsmCQL._SX258_BO1,204,203,200_.jpg',
                parts: 1,
                level: ['A1', 'A2'],
                rating: 5,
                ratingCount: 100,
                youtube_playlist_id: 'c1'
            },
            {
                id: 'a2',
                title: 'The Fox and The Crane',
                description: 'Лиса и Журавль',
                imageId: 'https://www.moscowbooks.ru/image/book/665/w259/i665072.jpg',
                parts: 1,
                level: ['B1', 'C1'],
                rating: 4,
                ratingCount: 80,
                youtube_playlist_id: 'c2'
            }
        ]
    },
    mutations: {
        SET_BOOKS(state, payload){
            state.books = payload
        },
    },
    getters: {
        getBooks: (state) => state.books,
    },
}