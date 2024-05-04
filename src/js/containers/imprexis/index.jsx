import React, { Component } from "react";

class Imprexis extends Component {
  render() {
    return (
      <div style={{ marginTop: "-3.5rem" }}>
        <link
          href="https://unpkg.com/buefy@0.9.23/dist/buefy.min.css"
          rel="stylesheet"
        />
        <style>
          {`
            @import url('https://fonts.googleapis.com/css2?family=Rajdhani:wght@600&family=Roboto:wght@400;500&display=swap');
            #content p {
              margin: 0px;
              padding: 0px;
            }
          `}
        </style>
        <script src="https://cdn.jsdelivr.net/npm/vue@2.7.14"></script>
        <script src="https://prod.gj2.imprexisplatform.com/gj-widget.js"></script>
        <gj-widget branding_id="15"></gj-widget>
      </div>
    );
  }
}

export default Imprexis;
