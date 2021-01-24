import { NgModule } from '@angular/core';

import { FontAwesomeModule, FaIconLibrary } from '@fortawesome/angular-fontawesome';

/**
 * STEPS for Icon Use:
 * 1) Determine which package the font-awesome icon lives in (free versions are fas or far)
 * 2) Import specific icon
 * 3) Add icon to "library" for use throughout the application
 * 4) Reference icon with <fa-icon icon="icon-name" size="lg"></fa-icon>
 *
 * Note:  This defaults to "fas" icons.  To use an far icon you need to make your html element like: <fa-icon [icon]="['far', 'envelope']"></fa-icon>
 */

/* "fas" - solid */
import {
  faChevronDown,
  faChevronUp,
  faChevronRight,
  faSearch,
  faCheck,
  faTimes,
  faChevronLeft,
  faTimesCircle,
  faAngleDown,
  faAngleRight,
  faAngleLeft,
  faCaretDown,
  faCamera,
} from '@fortawesome/free-solid-svg-icons';

/* "far" - regular */
import {
  faUserCircle,
  faListAlt,
  faFileAlt,
  faIdBadge,
  faLifeRing,
  faEnvelope,
  faEnvelopeOpen,
  faQuestionCircle,
  faBell,
  faBellSlash,
  faClock,
  faStar,
  faTrashAlt,
  faCalendarAlt,
} from '@fortawesome/free-regular-svg-icons';

// Add an icon to the library for convenient access in other components
@NgModule({
  imports: [FontAwesomeModule],
  declarations: [],
  exports: [FontAwesomeModule],
})
export class FontAwesome {
  constructor(library: FaIconLibrary) {
    library.addIcons(
      faChevronDown,
      faChevronUp,
      faAngleDown,
      faUserCircle,
      faListAlt,
      faFileAlt,
      faIdBadge,
      faChevronRight,
      faSearch,
      faCheck,
      faTimes,
      faChevronLeft,
      faTimesCircle,
      faAngleRight,
      faAngleLeft,
      faEnvelope,
      faEnvelopeOpen,
      faLifeRing,
      faCaretDown,
      faCamera,
      faQuestionCircle,
      faBell,
      faBellSlash,
      faClock,
      faStar,
      faTrashAlt,
      faCalendarAlt,
    );
  }
}
