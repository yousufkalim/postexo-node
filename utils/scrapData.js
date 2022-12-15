const cron = require('node-cron');
const fetch = require('cross-fetch');
const Session = require('../models/Session');
const Level = require('../models/Level');

const sessions = [
  {
    id: 891,
    created_at: '2022-09-22 13:32:44',
    matiere: 'Mathématiques',
    regulier: 1,
    chapitre: 'test ',
    subjects: null,
    difficulty_level: 'Facile',
    resolution_file: 'http://176.31.132.96:9000/postexo/exos/2f2dc4e20199ef3ef397185de191725d.jpeg',
    level: 'Collège',
    message: 'Test ',
    duration: 14,
    rate: null,
    professeur_name: 'Reda F.',
    etudiant_name: 'houssaine G.',
  },
  {
    id: 892,
    created_at: '2022-09-22 13:32:44',
    matiere: 'Biology',
    regulier: 1,
    chapitre: 'Chapter 92',
    subjects: null,
    difficulty_level: 'Normal',
    resolution_file: 'http://176.31.132.96:9000/postexo/exos/2f2dc4e20199ef3ef397185de191725d.jpeg',
    level: 'University',
    message: 'Test ',
    duration: 14,
    rate: null,
    professeur_name: 'Prof. Mr.Shehroz',
    etudiant_name: 'Azeem',
  },
  {
    id: 893,
    created_at: '2022-09-22 13:32:44',
    matiere: 'Physics',
    regulier: 4,
    chapitre: 'test ',
    subjects: 'Testing',
    difficulty_level: 'Easy',
    resolution_file: 'http://176.31.132.96:9000/postexo/exos/2f2dc4e20199ef3ef397185de191725d.jpeg',
    level: 'School',
    message: 'Tests ',
    duration: 30,
    rate: null,
    professeur_name: 'Zohaib Zia',
    etudiant_name: 'Suleman Tariq',
  },
  {
    id: 894,
    created_at: '2022-09-22 13:32:44',
    matiere: 'Chemistry',
    regulier: 13,
    chapitre: 'test 2',
    subjects: 'Testing',
    difficulty_level: 'Easy',
    resolution_file: 'http://176.31.132.96:9000/postexo/exos/2f2dc4e20199ef3ef397185de191725d.jpeg',
    level: 'School',
    message: '123223 ',
    duration: 20,
    rate: null,
    professeur_name: 'Zohaib Zia',
    etudiant_name: 'Suleman Tariq',
  },
];

const getSessionData = async () => {
  const url = 'https://postexoapi.aramobile.com/api/export/resolved/exos';

  fetch(url)
    .then((res) => res.json())
    .then(() => {
      //   const data = resp.exos.data[0];
      const data = sessions;

      data?.forEach(async function (item) {
        const {
          id,
          regulier,
          matiere,
          subjects,
          difficulty_level,
          resolution_file,
          level,
          chapitre,
          message,
          duration,
          rate,
          fb_data,
          professeur_name: professeurName,
          etudiant_name: etudiantName,
          created_at,
          photos,
          audio_twilio: audioTwilio,
          recording_audio: recordingAudio,
          created_at_from_twilio: createdAtFromTwilio,
        } = item;
        const dataToSave = {
          session: id,
          regular: regulier,
          subject: subjects,
          difficulty_level,
          resolution_file,
          student_level: level,
          session_recording: recordingAudio,
          message,
          twilio_audio: audioTwilio,
          created_at_from_twilio: createdAtFromTwilio,
          photos,
          duration,
          fb_data,
          rating: rate,
          professor_name: professeurName,
          student_name: etudiantName,
          matter: matiere,
          chapters: chapitre,
          created_at,
        };
        const findSession = await Session.findOne({ session: id });
        if (findSession) {
          await Session.findOneAndUpdate({ session: id }, dataToSave);
        } else {
          const newSession = new Session(dataToSave);
          await newSession.save();
        }
      });
    })
    .catch(() => {});
};

const getStudentLevels = () => {
  const url = ' https://postexoapi.aramobile.com/api/levels ';
  fetch(url)
    .then((res) => res.json())
    .then((resp) => {
      const data = resp.levels;
      data?.forEach(async function (item) {
        const { id, label } = item;
        const dataToSave = {
          id: id,
          label,
        };
        const findLevel = await Level.findOne({ id: id });
        if (findLevel) {
          await Level.findOneAndUpdate({ id: id }, dataToSave);
        } else {
          const newLevel = new Level(dataToSave);
          await newLevel.save();
        }
      });
    })
    .catch(() => {});
};

module.exports = getStudentLevels;

cron.schedule('00 01 00 * * 0-6', () => {
  getSessionData();
  getStudentLevels();
});
