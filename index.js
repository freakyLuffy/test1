const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const port = 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

// middleware to enable SharedBuffer to be used
app.use(function(req, res, next) {
  res.header("Cross-Origin-Embedder-Policy", "require-corp");
  res.header("Cross-Origin-Opener-Policy", "same-origin");
  next();
});


app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// app.post('/download', (req, res) => {
//   const username = req.body.username;
//   const outputFolder = 'downloads';
//   const format = 'mp4';

//   if (format !== 'mp4') {
//     console.error('Only mp4 format is supported at the moment');
//     return res.status(400).send('Only mp4 format is supported at the moment');
//   }

//   const url = `https://www.tiktok.com/@${username}/live`;

//   fetch(url)
//     .then((res) => res.text())
//     .then(async (body) => {
//       const matches = body.match(/room_id=(\d+)/);

//       if (!matches) {
//         console.log('No live stream found.');
//         return res.status(404).send('No live stream found.');
//       }

//       const roomId = matches[1];
//       const apiURL = `https://www.tiktok.com/api/live/detail/?aid=1988&roomID=${roomId}`;

//       const response = await fetch(apiURL);
//       const { LiveRoomInfo: { title, liveUrl } } = await response.json();

//       console.log(`Found live "${title}":`);
//       console.log(`m3u8 URL: ${liveUrl}`);

//       const fileName = `${outputFolder}/${username}-${Date.now()}.mp4`;

//       fs.mkdirSync(path.dirname(fileName), { recursive: true });

//       console.log(`Downloading to ${fileName}`);
//       shell.exec(`ffmpeg -i ${liveUrl} -c copy ${fileName}`, (code, stdout, stderr) => {
//         if (code === 0) {
//           console.log('Download completed successfully');
//           return res.download(fileName);
//         } else {
//           console.error(`Error occurred during download: ${stderr}`);
//           return res.status(500).send(`Error occurred during download: ${stderr}`);
//         }
//       });
//     })
//     .catch((err) => {
//       console.error('Error occurred during fetching:', err);
//       return res.status(500).send('Error occurred during fetching');
//     });
// });

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
