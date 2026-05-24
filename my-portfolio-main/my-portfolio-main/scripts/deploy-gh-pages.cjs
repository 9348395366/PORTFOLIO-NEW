const ghpages = require("gh-pages");

ghpages.clean();

ghpages.publish(
  "build",
  {
    branch: "gh-pages",
    repo: "https://github.com/9348395366/PORTFOLIO-NEW.git",
    dotfiles: true,
  },
  (error) => {
    if (error) {
      console.error("GitHub Pages deploy failed.");
      console.error(error);
      process.exit(1);
    }

    console.log("GitHub Pages deploy completed.");
  }
);
