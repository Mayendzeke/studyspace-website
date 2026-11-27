# Study Space — Public Website

Official public-facing website for Study Space, an Eswatini learning platform.

## Local preview

This is a lightweight static site. Open `index.html` in a browser or serve the repository with any static web server.

## Publish with GitHub Pages

The website now publishes automatically through the repository-owned GitHub Actions workflow:

- Workflow: `.github/workflows/deploy.yml`
- Every push to `main` runs the static website quality checks, assembles the public HTML/CSS/JS and legal pages, and deploys the artifact to GitHub Pages.
- Pull requests run validation but do not publish.
- A manual deployment can be started from **Actions → Deploy Study Space public website → Run workflow**.

The deployment must complete successfully before a change is treated as live. The public URL is https://mayendzeke.github.io/studyspace-website/.

## Key destinations

- Student app: https://mayendzeke.github.io/planner/
- Monitor app: https://mayendzeke.github.io/studyspace-monitor/
- WhatsApp: https://wa.me/26879940955

## Design and accessibility

Responsive mobile-first layout, Study Space graduation-cap identity, animated welcome splash, glass surfaces, subtle pointer and scroll effects, reduced-motion and reduced-transparency fallbacks, semantic sections, keyboard-accessible native FAQ disclosures, metadata, sitemap and robots file.

## Photography

The homepage and audience sections use responsive photographic imagery from Unsplash. Images are loaded with width and quality parameters; check the applicable Unsplash licence and image-specific terms before reusing them outside this website.


## Development standard

All changes must follow [STUDYSPACE_DEVELOPMENT_STANDARD.md](STUDYSPACE_DEVELOPMENT_STANDARD.md). The pull-request template includes the required visual consistency, accessibility and verification checklist.
