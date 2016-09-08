import Bootstrap from './Bootstrap'
import ErrorPage from './ErrorPage'
import FrozenHead from 'react-frozenhead'
import React from 'react'
import SupportStore from '../stores/SupportStore'
import { RouteHandler } from 'react-router'

export default class App extends React.Component {

  constructor() {
    super()
    this.state = SupportStore.getState()

    this._onChange = () => {
      this.setState(SupportStore.getState())
    }
  }

  componentDidMount() {
    SupportStore.listen(this._onChange)
  }

  componentDidUnmount() {
    SupportStore.unlisten(this._onChange)
  }

  render() {
    return <html lang="en">
      <FrozenHead>

        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta property="og:url" content="http://fp.tristank.de" />
        <meta property="og:title" content="FilePizza - Your files, delivered." />
        <meta property="og:description" content="Peer-to-peer file transfers in your web browser." />
        <meta property="og:image" content="http://fp.tristank.de/images/fb.png" />
        <title>FilePizza - Your files, delivered.</title>

        <link rel="stylesheet" href="/fonts/fonts.css" />
        <link rel="stylesheet" href="/css" />

        <Bootstrap data={this.props.data} />
        <script src="/js" />

      </FrozenHead>

      <body>
        <div className="container">
          {this.state.isSupported
            ? <RouteHandler />
            : <ErrorPage />}
        </div>
        <footer className="footer">
          <p className="byline">
            <a href="https://github.com/kern/filepizza" target="_blank">Source Code</a>
          </p>
        </footer>
        <script>FilePizza()</script>
        <ga.Initializer />
      </body>
    </html>
  }

}
