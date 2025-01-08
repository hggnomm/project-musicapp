const userRoute = require('../routes/auth');
const artistRoute = require('../routes/artists')
const albumRoute = require('../routes/albums')
const songRoute = require('../routes/songs')

const route = (app) => {
    /**
     *  Cấu hình routes
     */
    app.use('/api/users', userRoute);
    app.use('/api/artists', artistRoute);
    app.use('/api/albums', albumRoute);
    app.use('/api/songs', songRoute);
}
module.exports = route;