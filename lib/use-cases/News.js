let Parser = require("rss-parser");
let parser = new Parser();

module.exports = async () => {
  let feed = await parser.parseURL("http://feeds.bbci.co.uk/news/rss.xml");
  newsUpdate = {
    title: feed.items[0].title,
    link: feed.items[0].link,
    content: feed.items[0].content,
  };
  return newsUpdate;
};
