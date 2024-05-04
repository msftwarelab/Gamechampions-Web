import React from "react";
import { connect } from "react-redux";
import { withTranslation } from "react-i18next";
import hoistStatics from "hoist-non-react-statics";
import tocbot from "tocbot";
import { Helmet } from "react-helmet";

import { REDUCER_NAME } from "./constants";
import {
  fetchNewsDetail,
  fetchRelatedBlogs,
  getNewsDetail,
  getRelatedBlogs
} from "./actions";
import { selectNewsDetail, selectRelatedNews } from "./reducer";
import withUmbracoPage from "../page/withUmbracoPage";
import { createStructuredSelector } from "reselect";
import { selectSelectedLanguage } from "../multiLanguage/reducer";
import RelatedNews from "../../components/home/relatedNews";

class NewsDetail extends React.PureComponent {
  constructor(props) {
    super(props);
    this.initTocbot = this.initTocbot.bind(this);
    this.destroyTocbot = this.destroyTocbot.bind(this);
  }
  componentDidMount() {
    const { onLoadRelatedBlogs, selectedLanguage, match } = this.props;
    onLoadRelatedBlogs({ url: match.url, language: selectedLanguage });
    this.initTocbot();
    this.generateHeadingIds();
  }

  componentDidUpdate(prevProps) {
    this.generateHeadingIds();
    this.destroyTocbot();
    this.initTocbot();
  }

  generateHeadingIds() {
    const { newsDetail } = this.props;
    const headings = document.querySelectorAll("h1, h2, h3, h4, h5, h6");
    headings.forEach((heading, index) => {
      const content = heading.textContent.trim();
      const id = content.toLowerCase().replace(/\s+/g, "-");
      heading.setAttribute("id", id);

      const headingLevel = parseInt(heading.tagName.charAt(1));
      newsDetail.set(`heading${headingLevel}Id`, id);
    });
  }

  initTocbot() {
    tocbot.init({
      tocSelector: "#toc",
      contentSelector: ".news-detail__section__html",
      headingSelector: "h2",
      hasInnerContainers: true,
      scrollSmooth: true
    });
  }

  destroyTocbot() {
    tocbot.destroy();
  }

  filterPageHtml(page) {
    const { isNativeMobile } = this.props;

    if (!isNativeMobile) {
      return page;
    }

    return page.set("html", page.get("html").replace(/href=\"(.+?)\"/g, ""));
  }

  formatDate(inputDate) {
    const options = {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
      hour12: true,
      timeZoneName: "short"
    };

    const date = new Date(inputDate);
    const formattedDate = date.toLocaleString("en-US", options);
    return formattedDate;
  }

  render() {
    const { t, isNativeMobile, relatedNews } = this.props;

    const newsDetail = this.filterPageHtml(this.props.newsDetail);

    return (
      <div className={`news-detail ${isNativeMobile && "native-mobile"}`}>
        <Helmet>
          <meta
            name="author"
            content={
              newsDetail.get("lastModifiedBy")
                ? newsDetail.get("lastModifiedBy").get("name")
                : newsDetail.get("meta")
                ? newsDetail.get("meta").get("creator")
                : ""
            }
          />
          <meta
            property="article:published_time"
            content={
              newsDetail.get("meta") ? newsDetail.get("meta").get("date") : ""
            }
          />
          <meta
            property="article:modified_time"
            content={newsDetail.get("lastModeifiedDate")}
          />
          <script
            async
            src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-9653440364391244"
            crossorigin="anonymous"
          />
        </Helmet>
        <section className="news-detail__section">
          {newsDetail.get("thumbnail") && (
            <div className="news-detail__section__image">
              <img
                src={`${process.env.STORAGE_URL}${newsDetail
                  .get("thumbnail")
                  .get("src")}`}
                alt={newsDetail.get("thumbnail").get("alt")}
                title={newsDetail.get("thumbnail").get("title")}
                loading="lazy"
              />
            </div>
          )}
          {newsDetail.get("h1Title") && (
            <div className="news-detail__section__title">
              <h1>{newsDetail.get("h1Title")}</h1>
              <p>
                By{" "}
                <a
                  href={
                    newsDetail.get("lastModifiedBy")
                      ? newsDetail.get("lastModifiedBy").get("url")
                      : "#"
                  }
                  style={{ color: "#00B100", fontWeight: "bold" }}
                >
                  {newsDetail.get("lastModifiedBy")
                    ? newsDetail.get("lastModifiedBy").get("name")
                    : ""}
                </a>{" "}
                | updated On{" "}
                {this.formatDate(newsDetail.get("lastModifiedDate"))}
              </p>
            </div>
          )}
          <div className="toc-section">
            <div className="toc-contents-header">
              {t("TableOfContentsTitle")}
            </div>
            <div id="toc" className="toc-container"></div>
          </div>
          <div
            className="news-detail__section__html"
            dangerouslySetInnerHTML={{ __html: newsDetail.get("html") }}
          />
        </section>
        {relatedNews && <RelatedNews news={relatedNews.get("newsList")} />}
      </div>
    );
  }

  static fetchData(store, { url, language }) {
    return Promise.all([
      store.dispatch(fetchNewsDetail({ url, language })),
      store.dispatch(fetchRelatedBlogs({ url, language }))
    ]);
  }
}

const mapStateToProps = createStructuredSelector({
  newsDetail: selectNewsDetail,
  relatedNews: selectRelatedNews,
  selectedLanguage: selectSelectedLanguage
});

const mapDispatchToProps = dispatch => ({
  onLoadRelatedBlogs: data => dispatch(getRelatedBlogs(data))
});

export default withUmbracoPage(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(hoistStatics(withTranslation()(NewsDetail), NewsDetail)),
  getNewsDetail,
  REDUCER_NAME
);
