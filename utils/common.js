const getAppliedFilters = (levels, allDurations) => {
  const allFilters = [];
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
      $addFields: {
        fb_data: 0,
      },
      $match: {
        $and: [...allFilters],
      },
    },
  ];
  return aggregation;
};

module.exports = { getAppliedFilters };
