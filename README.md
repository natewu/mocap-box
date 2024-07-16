# motion capture engine using three.js to render into a box
1. receives input via websocket defined in a `.env` file with the url as `REACT_APP_WS_URL`
   - motion capture sensor sends data to a websocket server
   - server responds in the format in step 2
2. data format is in json format
   ```
   {
      device_id: {
          "t": time,
          "ax": accelerometer x,
          "ay": accelerometer y,
          "az": accelerometer z,
          "gx": gyro x,
          "gy": gyro y,
          "gz": gyro z
      }
   }
   ```
   to be received by the websocket connection
