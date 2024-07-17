# motion capture engine using three.js to render into a box
![image](https://github.com/user-attachments/assets/f3a5f383-37e4-42b7-a722-240cd47cf89e)

# instructions

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
