import {
  Component,
  OnDestroy,
  AfterViewInit,
  EventEmitter,
  Input,
  Output, HostListener, ViewChild, ElementRef
} from '@angular/core';
import {BroadcastService} from '../../../../../services';

@Component({
  selector: 'app-tiny-editor',
  templateUrl: './tiny-editor.component.html',
  styleUrls: ['./tiny-editor.component.scss']
})
export class TinyEditorComponent implements AfterViewInit, OnDestroy {
  @Input() elementId: string;
  @Input() createdFor: string;
  @Input() content: string;
  @Input() height: number;
  @Output() onEditorKeyup = new EventEmitter<any>();
  @ViewChild('editorContainer') editorContainer: ElementRef;
  private lastEvent: string;
  private editor;
  private editorContent = '';
  private resetEditor$;

  constructor(private broadcastService: BroadcastService) {
  }

  initEditor() {
    tinymce.init({
      selector: '#' + this.elementId,
      plugins: ['link', 'paste', 'table', 'image'],
      skin_url: '/assets/tinymce_skins/lightgray',
      height: this.height ? this.height + 5 : 200,
      content_style: '.htmlheight {height: 100%} .bodyheight {height: 87%}',

      setup: editor => {
        this.editor = editor;

        editor.on('click', () => {
          this.firesFocusEventIfIOS();
        });

        editor.on('keyup', () => {
          this.editorContent = editor.getContent();
          this.sendChangeEditorEvent();
        });

        editor.on('focus', () => {
          this.lastEvent = 'focus';
          this.sendChangeEditorEvent();
        });

        editor.on('Change', (e) => {
          this.editorContent = editor.getContent();
          this.sendChangeEditorEvent();
        });
      },
    }).then((editors) => {
      this.editor.dom.addClass(this.editor.dom.select('html'), 'htmlheight');
      this.editor.dom.addClass(this.editor.dom.select('body'), 'bodyheight');
      if (!!this.content) {
        this.editor.setContent(this.content);
      }
    });
  }

  resetEditor() {
    this.editor.setContent('');
    tinymce.remove(this.editor);
    this.editor = null;
    this.initEditor();
    this.lastEvent = 'blur';
    this.sendChangeEditorEvent();
  }

  ngAfterViewInit() {
    this.initEditor();

    if (this.createdFor === 'addArticle') {
      this.resetEditor$ = this.broadcastService.subscribe('resetArticleEditor', () => {
        this.resetEditor();
      });
    }
  }

  @HostListener('document:click', ['$event', '$event.target'])
  public onClick(event: MouseEvent, targetElement: HTMLElement): void {
    if (!targetElement) { return; }

    //check for blur event
    if (!!this.editorContainer) {
      const contains = this.editorContainer.nativeElement.contains(targetElement);
      if (!contains) {
        this.hideKeyboardOnIOSWhenBlurEventFires();
        this.lastEvent = 'blur';
        this.sendChangeEditorEvent();
      }
    }
  }

  firesFocusEventIfIOS() {
    const iOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window['MSStream'];
    if (iOS) {
      this.lastEvent = 'focus';
      this.sendChangeEditorEvent();
    }
  }

  hideKeyboardOnIOSWhenBlurEventFires() {
    const iOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window['MSStream'];
    if (iOS) {
      this.editor.focus(); //fix hiding keyboard on ios
      this.editor.iframeElement.blur(); //fix hiding keyboard on ios
    }
  }

  sendChangeEditorEvent() {
    this.onEditorKeyup.emit({
      eventName: this.lastEvent, isEditorEmpty: this.isEditorEmpty(), editorContent: this.editorContent
    });
  }

  isEditorEmpty() {
    if (!!this.editor) {
      return !this.editor.getContent({format: 'text'}).trim().length &&
        this.editorContent.indexOf('<img') === -1;
    }
    return true;
  }

  ngOnDestroy() {
    tinymce.remove(this.editor);

    if (this.resetEditor$) {
      this.resetEditor$.unsubscribe();
    }
  }
}
