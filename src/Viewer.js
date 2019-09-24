import React, { Component } from "react";
import ReactDOM from "react-dom";
import PropTypes from "prop-types";
import { PDFViewer, EventBus } from "pdfjs-dist/web/pdf_viewer.js";
import "./Viewer.css";
import "pdfjs-dist/web/pdf_viewer.css";

var USE_ONLY_CSS_ZOOM = true;
var TEXT_LAYER_MODE = 0; // DISABLE
class Viewer extends Component {
  constructor(props) {
    super(props);
    this.initEventBus();
    this.state = {
      doc: null,
      scale: undefined
    };
  }
  initEventBus() {
    //PDFJSViewer.
    let eventBus = new EventBus();
    eventBus.on("pagesinit", e => {
      this.setState({
        scale: this._pdfViewer.currentScale
      });
      if (this.props.onInit) {
        this.props.onInit({});
      }
      if (this.props.onScaleChanged) {
        this.props.onScaleChanged({ scale: this.state.scale });
      }
      this._pdfViewer.currentScaleValue = "auto";
    });
    eventBus.on("scalechange", e => {
      if (this.props.onScaleChanged) {
        this.props.onScaleChanged({ scale: e.scale });
      }
    });
    this._eventBus = eventBus;
  }
  componentDidMount() {
    let viewerContainer = ReactDOM.findDOMNode(this);
    //PDFJSViewer.
    this._pdfViewer = new PDFViewer({
      container: viewerContainer,
      eventBus: this._eventBus,
      // renderer: "svg",
      textLayerMode: 0
    });
  }
  componentWillUpdate(nextProps, nextState) {
    if (this.state.doc !== nextState.doc) {
      this._pdfViewer.setDocument(nextState.doc);
    }
    if (this.state.scale !== nextState.scale) {
      this._pdfViewer.currentScale = nextState.scale;
    }
  }
  shouldComponentUpdate(nextProps, nextState) {
    if (
      this.state.doc !== nextState.doc ||
      this.state.scale !== nextState.scale
    ) {
      return true;
    }
    return false;
  }
  render() {
    return (
      <div className="Viewer">
        <div className="pdfViewer"></div>
      </div>
    );
  }
}

Viewer.propTypes = {
  onInit: PropTypes.func,
  onScaleChanged: PropTypes.func
};

export default Viewer;
