const PingPongController = {
    ping: async (req, res) => {
        res.json({ data: 'pong' });
    },
};

export { PingPongController };
