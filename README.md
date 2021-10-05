# react-motion-detect

A simple react component to detect motion from a camera and callback when detected.

## Usage

```javascript

import Motion from 'react-detect-motion';

const MyComponent = () => {
    const onMotion = () => {
        console.log('I get called when motion is detected')
    }

    return <Motion onMotion={onMotion} />
}

```

There many parameters to the component to configure the sensitivity and behavior.


| Parameter | Type | Description |
| ----------- | ----------- | ----------- |
| onMotion    | Function | **Required:** function called when motion is detected |
| detectInterval | Number | (optional) number of milliseconds between polling the video images for changes/movement - default: 100 |
| width | Number | (optional) pixel width of the video used to analyze movement (and optionally display) - default: 64 |
| height | Number | (optional) pixel height of the video used to analyze movement (and optionally display) - default: 48 |
| motionThreashold | Number | (optional) total distance of all pixel shifts between analyzed frames to trigger motion detected - default: 50000 |
| minTimeBetween | Number | (optional) minimum time between onMotion function calls in milliseconds - default: 3000 |
| showElements | Boolean | (optional) when enabled, the video and camera elements will be visibly rendered - this is required for Safari - default: false |

## Disclaimer

This has only been tested in the Chrome (Windows & MacOS) and on Safari (MacOS) -- your mileage may vary.