// wp.service.spec.ts
import { TestBed } from '@angular/core/testing';
import { WpService } from './wpService';


describe('WpService', () => {
    let service: WpService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [WpService]
        });
        service = TestBed.inject(WpService);
    });

    it('emits a page when slug is valid', (done) => {
        service.page$.subscribe((page) => {
            if (!page) return;
            expect(page?.title).toEqual({ rendered: 'Création sites internet' });
            done();
        });
        service.loadBySlug('creation-sites-internet');
    });

    it('emits an error when slug is not valid', (done) => {
        service.error$.subscribe((error) => {
            if (!error) return;
            expect(error).toEqual('Page: invalid-slug not found !');
            done();
        });
        service.loadBySlug('invalid-slug');
    });
})