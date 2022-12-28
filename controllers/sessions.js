/* eslint-disable no-case-declarations */
const Session = require('../models/Session');
const User = require('../models/User');

// Get ALL Sessions of a user and Get by filters
exports.getAllSessions = async (req, res) => {
  const { durations: allDurations, levels, languages } = req.query;
  try {
    const allFilters = [];
    if (allDurations?.length || levels?.length || languages?.length) {
      if (levels?.length) {
        const levelsArr = levels.split(',');
        const levelsFilter = {
          student_level: {
            $in: levelsArr,
          },
        };
        allFilters.push(levelsFilter);
      }
      if (allDurations?.length) {
        const durations = allDurations.split(',');

        const durationArr = [];
        const veryshortDuration = durations.includes('Very short');
        const shortDuration = durations.includes('Short');
        const longDuration = durations.includes('Long');

        durations?.forEach(() => {
          if (veryshortDuration) {
            const veryshortFilterObj = {
              duration: {
                $lt: 10,
              },
            };
            durationArr.push(veryshortFilterObj);
          }
          if (shortDuration) {
            const shortFilterObj = {
              $and: [
                {
                  duration: {
                    $gte: 10,
                  },
                },
                {
                  duration: {
                    $lte: 15,
                  },
                },
              ],
            };
            durationArr.push(shortFilterObj);
          }
          if (longDuration) {
            const longFilterObj = {
              duration: {
                $gt: 15,
              },
            };
            durationArr.push(longFilterObj);
          }
        });

        const durationFilters = {
          $or: [...durationArr],
        };

        allFilters.push(durationFilters);
      }
      const aggregation = [
        {
          $match: {
            $and: [...allFilters],
          },
        },
      ];
      const resp = await Session.aggregate(aggregation);
      res.status(200).json({ sessions: resp });
    } else {
      const allSessions = await Session.find()
        .populate('comments.user')
        .populate('ratings.user')
        .populate('likes')
        .populate('dislikes')
        .populate('views');
      res.status(200).json({ sessions: allSessions });
    }
  } catch (err) {
    res.status(400).json({ message: 'Something went wrong' });
  }
};

// Get a session by session Id
exports.getSessionById = async (req, res) => {
  const { sessionId } = req.params;

  try {
    const session = await Session.findById(sessionId).populate('comments.user');

    res.status(200).json({ session: session });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Add Comment to session
exports.addCommentToSession = async (req, res) => {
  const { sessionId } = req.params;

  try {
    const { userId } = req.body;

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    await Session.findOneAndUpdate(
      { _id: sessionId },
      {
        $push: { comments: { comment: req.body.comment, user: req.body.userId } },
      },
      {
        new: true,
      },
    );
    res.status(200).json({ message: 'Comment added successfully' });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Add Like to session
exports.likeSession = async (req, res) => {
  const { sessionId } = req.params;

  try {
    const { userId } = req.body;

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    await Session.findOneAndUpdate(
      { _id: sessionId },
      {
        $addToSet: { likes: req.body.userId },
        $pull: { dislikes: req.body.userId },
      },
      {
        new: true,
      },
    );
    res.status(200).json({ message: 'Comment added successfully' });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Add Dislike to session
exports.dislikeSession = async (req, res) => {
  const { sessionId } = req.params;

  try {
    const { userId } = req.body;

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    await Session.findOneAndUpdate(
      { _id: sessionId },
      {
        $addToSet: { dislikes: req.body.userId },
        $pull: { likes: req.body.userId },
      },
      {
        new: true,
      },
    );
    res.status(200).json({ message: 'Comment added successfully' });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Add View to session
exports.addViewToSession = async (req, res) => {
  const { sessionId } = req.params;

  try {
    const { userId } = req.body;

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    await Session.findOneAndUpdate(
      { _id: sessionId },
      {
        $addToSet: { views: req.body.userId },
      },
      {
        new: true,
      },
    );
    res.status(200).json({ message: 'Comment added successfully' });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Add View to session
exports.shareSession = async (req, res) => {
  const { sessionId } = req.params;

  try {
    const { userId } = req.body;

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    const session = await Session.findById(sessionId);
    await Session.findOneAndUpdate(
      { _id: sessionId },
      {
        shares: session.shares + 1,
      },
      {
        new: true,
      },
    );
    res.status(200).json({ message: 'Comment added successfully' });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.favouriteSession = async (req, res) => {
  try {
    const { sessionId } = req.params;
    const { userId } = req.body;
    const isFavoriteExists = await User.find({ _id: userId, favorites: sessionId });

    if (isFavoriteExists?.length) {
      const updateUser = await User.findOneAndUpdate(
        { _id: userId },
        {
          $pull: { favorites: sessionId },
        },
      );
      res
        .status(200)
        .json({ data: { user: updateUser, message: 'Session removed from my favourites list' } });
    } else {
      const updateUser = await User.findOneAndUpdate(
        { _id: userId },
        {
          $addToSet: { favorites: sessionId },
        },
      );
      res
        .status(200)
        .json({ data: { user: updateUser, message: 'Session added to my favourites list' } });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.playlistSession = async (req, res) => {
  try {
    const { sessionId } = req.params;
    const { userId, add } = req.body;

    if (add) {
      const updateUser = await User.findOneAndUpdate(
        { _id: userId },
        {
          $addToSet: { play_list: sessionId },
        },
      );
      res.status(200).json({ data: { user: updateUser, message: 'Session added to my playlist' } });
    } else {
      await User.findOneAndUpdate(
        { _id: userId },
        {
          $pull: { play_list: sessionId },
        },
      );
      res.status(200).json({ message: 'Session removed from my playlist' });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.watchLaterSession = async (req, res) => {
  try {
    const { sessionId } = req.params;
    const { userId } = req.body;

    const updateUser = await User.findOneAndUpdate(
      { _id: userId },
      {
        $addToSet: { watch_later: sessionId },
      },
    );
    res.status(200).json({ data: { user: updateUser, message: 'Session added to watch later' } });

    // if (add) {
    //   const updateUser = await User.findOneAndUpdate(
    //     { _id: userId },
    //     {
    //       $addToSet: { watch_later: sessionId },
    //     },
    //   );
    //   res.status(200).json({ data: { user: updateUser, message: 'Session added to watch later' } });
    // } else {
    //   const updateUser = await User.findOneAndUpdate(
    //     { _id: userId },
    //     {
    //       $pull: { watch_later: sessionId },
    //     },
    //   );
    //   res
    //     .status(200)
    //     .json({ data: { user: updateUser, message: 'Session removed from watch later' } });
    // }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getSessionsByProfessor = async (req, res) => {
  const { professorName } = req.query;
  try {
    const sessions = await Session.find({ professor_name: professorName });

    res.status(200).json({
      sessions,
    });
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

exports.getSessionsByMatter = async (req, res) => {
  const { matterName } = req.query;
  try {
    const sessions = await Session.find({ matter: matterName });

    res.status(200).json({
      sessions,
    });
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

exports.actionOnSession = async (req, res) => {
  const { sessionId } = req.params;
  const { userId, flag } = req.body;
  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const { like, dislike, comment, share, view, rate } = req.query;

    if (like) {
      if (flag) {
        await Session.findOneAndUpdate(
          { _id: sessionId },
          {
            $addToSet: { likes: userId },
            $pull: { dislikes: userId },
          },
          {
            new: true,
          },
        );
        res.status(200).json({ message: 'Session liked successfully' });
      } else {
        await Session.findOneAndUpdate(
          { _id: sessionId },
          {
            $pull: { likes: userId },
          },
          {
            new: true,
          },
        );
        res.status(200).json({ message: 'Session liked removed successfully' });
      }
    } else if (dislike) {
      if (flag) {
        await Session.findOneAndUpdate(
          { _id: sessionId },
          {
            $addToSet: { dislikes: userId },
            $pull: { likes: userId },
          },
          {
            new: true,
          },
        );
        res.status(200).json({ message: 'Session disliked successfully' });
      } else {
        await Session.findOneAndUpdate(
          { _id: sessionId },
          {
            $pull: { dislikes: userId },
          },
          {
            new: true,
          },
        );
        res.status(200).json({ message: 'Session disliked removed successfully' });
      }
    } else if (comment) {
      await Session.findOneAndUpdate(
        { _id: sessionId },
        {
          $push: { comments: { comment: req.body.comment, user: userId } },
        },
        {
          new: true,
        },
      );
      res.status(200).json({ message: 'Comment posted successfully' });
    } else if (share) {
      const session = await Session.findById(sessionId);
      await Session.findOneAndUpdate(
        { _id: sessionId },
        {
          shares: session.shares ? session.shares + 1 : 1,
        },
        {
          new: true,
        },
      );
      res.status(200).json({ message: 'Session shared successfully' });
    } else if (view) {
      await Session.findOneAndUpdate(
        { _id: sessionId },
        {
          $addToSet: { views: req.body.userId },
        },
        {
          new: true,
        },
      );
      res.status(200).json({ message: 'Session viewed successfully' });
    } else if (rate) {
      const findSession = await Session.find({ _id: sessionId, 'ratings.user': userId });

      if (findSession?.length) {
        await Session.findOneAndUpdate(
          {
            _id: sessionId,
            'ratings.user': userId,
          },
          {
            $set: { 'ratings.$.rating': req.body.rating },
          },
          {
            new: true,
          },
        );
        const session = await Session.findById(sessionId);

        let ratingSum = 0;
        let avgRating = 0;
        const ratingCount = session?.ratings?.length;
        session.ratings?.forEach((item) => {
          ratingSum = ratingSum + item.rating;
        });
        if (ratingCount) {
          avgRating = (ratingSum / ratingCount)?.toFixed(1);
        }
        await Session.findOneAndUpdate(
          { _id: sessionId },
          {
            averageRating: avgRating,
          },
          { new: true },
        );
      } else {
        await Session.findOneAndUpdate(
          {
            _id: sessionId,
          },
          {
            $push: {
              ratings: {
                user: userId,
                rating: req.body.rating,
              },
            },
          },
          {
            new: true,
          },
        );

        const session = await Session.findById(sessionId);

        let ratingSum = 0;
        let avgRating = 0;
        const ratingCount = session?.ratings?.length;
        session.ratings?.forEach((item) => {
          ratingSum = ratingSum + item.rating;
        });
        if (ratingCount) {
          avgRating = (ratingSum / ratingCount)?.toFixed(1);
        }

        await Session.findOneAndUpdate(
          { _id: sessionId },
          {
            averageRating: avgRating,
          },
          { new: true },
        );

        // session.findByIdAndUpdate(sessionId, {
        //     averageRating:
        // })
      }
      res.status(200).json({ message: 'Rate session successfully' });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
