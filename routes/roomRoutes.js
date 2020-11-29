module.exports = (app, io) => {
  app.post('/message_room/:id', (req, res) => {
    console.log(req.body.code);
    const roomId = req.params.id;
    io.sockets.in(roomId).emit('message', req.body.code);
  });
};
