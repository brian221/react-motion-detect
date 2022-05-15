"use strict";

require("core-js");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

let previous;
let current;
let interval;
let context;
let lastNotify = 0;

const isMotion = (current, previous, threashold) => {
  let diff = 0;

  for (let x = 0; x < current.length; x += 4) {
    diff += Math.abs(current[x] - previous[x]);
  }

  return diff > threashold;
};

const Motion = _ref => {
  let {
    onMotion = () => console.log('Motion Detected'),
    detectInterval = 100,
    width = 64,
    height = 48,
    motionThreashold = 50000,
    minTimeBetween = 3000,
    showElements = false // required for safari to function

  } = _ref;
  const canvasRef = (0, _react.useRef)();
  const videoRef = (0, _react.useRef)();
  const constraints = {
    audio: false,
    video: {
      width,
      height
    }
  };
  (0, _react.useEffect)(() => {
    context = canvasRef.current.getContext('2d');
    navigator.mediaDevices.getUserMedia(constraints).then(stream => {
      videoRef.current.srcObject = stream;
      interval = setInterval(() => {
        context.drawImage(videoRef.current, 0, 0, width, height);
        const imageData = context.getImageData(0, 0, canvasRef.current.width, canvasRef.current.height);
        current = imageData.data;

        if (previous && current !== previous) {
          if (isMotion(current, previous, motionThreashold)) {
            if (Date.now() - minTimeBetween > lastNotify) {
              onMotion();
              lastNotify = Date.now();
            }
          }
        }

        previous = current;
      }, 100);
    }).catch(e => {
      console.log(e);
    });
    return () => {
      clearInterval(interval);
    };
  }, []);
  const style = showElements ? {} : {
    display: 'none'
  };
  return /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement("video", {
    style: style,
    autoPlay: true,
    ref: videoRef
  }), /*#__PURE__*/_react.default.createElement("canvas", {
    style: style,
    ref: canvasRef,
    width: width,
    height: height
  }));
};

var _default = Motion;
exports.default = _default;
