const Playlist = require('../models/Playlist');
const User = require('../models/User');

exports.createPlaylist = async (req, res) => {
  try {
    const { title, userId } = req.body;
    const newPlaylist = new Playlist({ title, user: userId });

    const playlist = await newPlaylist.save();

    await User.findByIdAndUpdate(userId, { play_list: playlist?._id }, { new: true });

    res.status(200).json({ data: playlist });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.updatePlayList = async (req, res) => {
  try {
    const { playlistId } = req.params;
    const { sessionId } = req.body;

    const playlist = await Playlist.find({ _id: playlistId, sessions: sessionId });

    if (playlist?.length) {
      //   const updatePlaylist = await Playlist.findOneAndUpdate(
      //     { _id: playlistId },
      //     {
      //       $pull: {
      //         sessions: sessionId,
      //       },
      //     },
      //     {
      //       new: true,
      //     },
      //   );

      //   res.status(200).json({ data: { playlist: updatePlaylist } });
      res.status(200).json({ data: { playlist: playlist } });
    } else {
      const updatePlaylist = await Playlist.findOneAndUpdate(
        { _id: playlistId },
        {
          $addToSet: {
            sessions: sessionId,
          },
        },
        {
          new: true,
        },
      );

      res.status(200).json({ data: { playlist: updatePlaylist } });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
