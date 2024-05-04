import React from "react";
import parseHtml from "html-react-parser";
import { domToReact } from "html-react-parser";

import Banner from "../../components/banners/banner";
import withPage from "./withPage";
import { fetchPage, getPage } from "./actions";
import { REDUCER_NAME } from "./constants";
import ExecutionEnvironment from "exenv";

class Page extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      canUseDOM: false
    };
  }

  getHtmlParserOptions() {
    const options = this.state.canUseDOM
      ? {
          replace: ({ attribs, children }) => {
            if (!attribs) return;

            if (
              attribs["data-verified-link"] &&
              window.Verified &&
              window.Verified.protected_link
            ) {
              return React.createElement(
                "a",
                {
                  href: window.Verified.protected_link
                },
                domToReact(children, options)
              );
            }
          }
        }
      : undefined;

    return options;
  }

  componentDidMount() {
    this.setState({
      canUseDOM: ExecutionEnvironment.canUseDOM
    });
  }

  render() {
    const { isNativeMobile, page } = this.props;
    const options = this.getHtmlParserOptions();

    return (
      <div className={`page ${isNativeMobile && "native-mobile"}`}>
        {page.get("banners") && !!page.get("banners").size && (
          <Banner
            banner={page.get("banners").get(0)}
            className="page__banner"
          />
        )}
        <div className="page__container">
          <section className="page__section">
            {!!page.get("title") && (
              <div className="page__section__title">
                <h1>{page.get("title")}</h1>
              </div>
            )}
            {!!page.get("html") && (
              <div className="page__section__description">
                <div className="page__section__description__richtext">
                  {parseHtml(page.get("html"), options)}
                </div>
              </div>
            )}
          </section>
        </div>
      </div>
    );
  }

  static fetchData(store, { url, language }) {
    return store.dispatch(fetchPage({ url, language }, REDUCER_NAME));
  }
}

export default withPage(Page, getPage, REDUCER_NAME);
