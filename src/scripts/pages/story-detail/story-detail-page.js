import {
  generateLoaderAbsoluteTemplate,
  generateRemoveStoriesButtonTemplate,
  generateStoriesDetailTemplate,
  generateSaveStoriesButtonTemplate,
  generateStoriesDetailErrorTemplate,
} from '../../templates';

import { createCarousel } from '../../utils';
import StoriesDetailPresenter from './story-detail-presenter';
import { parseActivePathname } from '../../routes/url-parser';
import Map from '../../utils/maps';
import * as CityCareAPI from '../../data/api';

export default class StoryDetailPage {
  #presenter = null;
  #form = null;
  #map = null;

  async render() {
    return `
      <section>
        <div class="story-detail__container">
          <div id="story-detail" class="story-detail"></div>
          <div id="story-detail-loading-container"></div>
          <div id="map-loading-container"></div>
        </div>
      </section>
    `;
  }

  async afterRender() {
    this.#presenter = new StoriesDetailPresenter(parseActivePathname().id, {
      view: this,
      apiModel: CityCareAPI,
    });

    this.#presenter.showStoryDetail();
  }

  async populateStoriesDetailAndInitialMap(story) {

    console.log("populateStoriesDetailAndInitialMap: story:", story);

    document.getElementById('story-detail').innerHTML = generateStoriesDetailTemplate({
      name: story.name,
      description: story.description,
      photoUrl: story.photoUrl,
      createdAt: story.createdAt,
      location: story.location,
      lat: story.location.latitude,
      lon: story.location.longitude,
    });

    this.#setupForm(); 
    this.#initializeCarousel();
    await this.#initializeMap(story);

    this.#presenter.showSaveButton();
    this.#setupNotifyButton();
  }

  populateStoriesDetailError(message) {
    document.getElementById('story-detail').innerHTML = generateStoriesDetailErrorTemplate(message);
  }

  async #initializeMap(story) {
    this.#map = await Map.build('#map', { zoom: 15 });

    if (this.#map) {
      const coordinates = [story.lat, story.lon];
      const markerOptions = { alt: story.title };
      const popupOptions = { content: story.title };
      this.#map.changeCamera(coordinates);
      this.#map.addMarker(coordinates, markerOptions, popupOptions);
    }
  }

  #initializeCarousel() {
    const imageContainer = document.getElementById('images');
    if (imageContainer) {
      createCarousel(imageContainer);
    }
  }

  #setupForm() {
    this.#form = document.getElementById('story-detail-form');
    if (!this.#form) {
      console.warn('Form #story-detail-form tidak ditemukan.');
      return;
    }

    this.#form.addEventListener('submit', async (event) => {
      event.preventDefault();
      await this.#presenter.submitComment?.();
    });
  }

  #setupNotifyButton() {
    const notifyBtn = document.getElementById('story-detail-notify-me');
    if (notifyBtn) {
      notifyBtn.addEventListener('click', () => {
        alert('Fitur notifikasi akan segera hadir!');
      });
    }
  }

  renderSaveButton() {
    const container = document.getElementById('save-actions-container');
    if (container) {
      container.innerHTML = generateSaveStoriesButtonTemplate();

      const btn = document.getElementById('story-detail-save');
      btn?.addEventListener('click', () => {
      });
    }
  }

  renderRemoveButton() {
    const container = document.getElementById('save-actions-container');
    if (container) {
      container.innerHTML = generateRemoveStoriesButtonTemplate();

      const btn = document.getElementById('story-detail-remove');
      btn?.addEventListener('click', () => {
        alert('Fitur simpan cerita akan segera hadir!');
      });
    }
  }

  showStoryDetailLoading() {
    const container = document.getElementById('story-detail-loading-container');
    if (container) {
      container.innerHTML = generateLoaderAbsoluteTemplate();
    }
  }

  hideStoryDetailLoading() {
    const container = document.getElementById('story-detail-loading-container');
    if (container) {
      container.innerHTML = '';
    }
  }

  showMapLoading() {
    const container = document.getElementById('map-loading-container');
    if (container) {
      container.innerHTML = generateLoaderAbsoluteTemplate();
    }
  }

  hideMapLoading() {
    const container = document.getElementById('map-loading-container');
    if (container) {
      container.innerHTML = '';
    }
  }
}
