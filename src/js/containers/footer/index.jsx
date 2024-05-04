import React, { Fragment } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { createStructuredSelector } from "reselect";

import {
  fetchFooter,
  fetchSocial,
  fetchQuickLinks,
  fetchCredits
} from "./actions";
import {
  selectFooter,
  selectQuickLinks,
  selectSocial,
  selectCredits
} from "./reducer";

class Footer extends React.PureComponent {
  render() {
    const { footer, quickLinks, social, credits } = this.props;
    const thumbnail = footer.get("thumbnail");
    const images = footer.get("images");

    return (
      <footer className="footer">
        <div className="footer__content__container">
          <section className="footer__section footer__section--quick-links">
            {quickLinks &&
              quickLinks.size > 0 &&
              quickLinks.map(n => (
                <div key={n.get("id")} className="quick-links__column">
                  <p>{n.get("title")}</p>
                  <ul className="quick-links">
                    {n.get("links").map((m, index) => (
                      <Fragment key={index}>
                        <li className="quick-links__item">
                          {m.get("isInternal") ? (
                            <Link
                              to={m.get("url")}
                              target={m.get("isNewWindow") ? "_blank" : ""}
                              className="quick-links__item__link"
                            >
                              {m.get("title")}
                            </Link>
                          ) : (
                            <a
                              href={m.get("url")}
                              target={m.get("isNewWindow") ? "_blank" : ""}
                              rel="noopener"
                              className="quick-links__item__link"
                            >
                              {m.get("title")}
                            </a>
                          )}
                        </li>
                      </Fragment>
                    ))}
                  </ul>
                </div>
              ))}
          </section>
          <section className="footer__section">
            <ul className="social-links">
              {social.map(n => (
                <li key={n.get("id")} className="social-links__item">
                  <a
                    href={n.get("url")}
                    target="_blank"
                    rel="noopener"
                    className={`social-links__item__link ${n
                      .get("platform")
                      .toLowerCase()
                      .replace(/\s/, "-")}`}
                  >
                    {n.get("platform")}
                  </a>
                </li>
              ))}
            </ul>
          </section>
        </div>
        <div className="footer__content__end">
          <div className="footer__content__end__logo">
            {thumbnail && (
              <img
                src={thumbnail.get("src")}
                alt={thumbnail.get("alt")}
                title={thumbnail.get("title")}
                className="footer__content__end__logo__img"
                loading="lazy"
              />
            )}
            <p className="footer__content__end__logo__title">
              {footer.get("title")}
            </p>
            <div className="footer__content__end__logo__images">
              {images &&
                images.size > 0 &&
                images.map((n, i) => (
                  <img
                    key={i}
                    src={n.get("src")}
                    alt={n.get("alt")}
                    title={n.get("title")}
                    className="footer__content__end__logo__images__img"
                    loading="lazy"
                  />
                ))}
            </div>
          </div>
          <div
            className="footer__content__end__rights"
            dangerouslySetInnerHTML={{ __html: footer.get("html") }}
          />
        </div>
        <div
          className="footer__content__credits"
          dangerouslySetInnerHTML={{ __html: credits }}
        />
      </footer>
    );
  }

  static fetchData(store, { language }) {
    return Promise.all([
      store.dispatch(fetchSocial()),
      store.dispatch(fetchQuickLinks({ language })),
      store.dispatch(fetchCredits()),
      store.dispatch(fetchFooter({ language }))
    ]);
  }
}

const mapStateToProps = createStructuredSelector({
  footer: selectFooter,
  quickLinks: selectQuickLinks,
  social: selectSocial,
  credits: selectCredits
});

export default connect(mapStateToProps, null)(Footer);
