import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import styled from "styled-components"
import Youtube from "@tiptap/extension-youtube";
// Custom Extensions
import InfoCallout from "@components/Objects/Editor/Extensions/Callout/Info/InfoCallout";
import WarningCallout from "@components/Objects/Editor/Extensions/Callout/Warning/WarningCallout";
import ImageBlock from "@components/Objects/Editor/Extensions/Image/ImageBlock";
import VideoBlock from "@components/Objects/Editor/Extensions/Video/VideoBlock";
import MathEquationBlock from "@components/Objects/Editor/Extensions/MathEquation/MathEquationBlock";
import PDFBlock from "@components/Objects/Editor/Extensions/PDF/PDFBlock";
import { OrderedList } from "@tiptap/extension-ordered-list";
import QuizBlock from "@components/Objects/Editor/Extensions/Quiz/QuizBlock";

// Lowlight
import { common, createLowlight } from 'lowlight'
const lowlight = createLowlight(common)
import CodeBlockLowlight from '@tiptap/extension-code-block-lowlight';
import css from 'highlight.js/lib/languages/css'
import js from 'highlight.js/lib/languages/javascript'
import ts from 'highlight.js/lib/languages/typescript'
import html from 'highlight.js/lib/languages/xml'
import python from 'highlight.js/lib/languages/python'
import java from 'highlight.js/lib/languages/java'


interface Editor {
  content: string;
  activity: any;
  //course: any;
}

function Canva(props: Editor) {
  const isEditable = false;

  // Code Block Languages for Lowlight
  lowlight.register('html', html)
  lowlight.register('css', css)
  lowlight.register('js', js)
  lowlight.register('ts', ts)
  lowlight.register('python', python)
  lowlight.register('java', java)


  const editor: any = useEditor({
    editable: isEditable,
    extensions: [
      StarterKit,
      // Custom Extensions
      InfoCallout.configure({
        editable: isEditable,
      }),
      WarningCallout.configure({
        editable: isEditable,
      }),
      ImageBlock.configure({
        editable: isEditable,
        activity: props.activity,
      }),
      VideoBlock.configure({
        editable: true,
        activity: props.activity,
      }),
      MathEquationBlock.configure({
        editable: false,
        activity: props.activity,
      }),
      PDFBlock.configure({
        editable: true,
        activity: props.activity,
      }),
      QuizBlock.configure({
        editable: isEditable,
        activity: props.activity,
      }),
      Youtube.configure({
        controls: true,
        modestBranding: true,
      }),
      OrderedList.configure(),
      CodeBlockLowlight.configure({
        lowlight,
      }),

    ],

    content: props.content,
  });

  return (
    <CanvaWrapper>
      <EditorContent editor={editor} />
    </CanvaWrapper>
  );
}

const CanvaWrapper = styled.div`
  width: 100%;
  margin: 0 auto;

  // disable chrome outline

  .ProseMirror {

    h1 {
      font-size: 30px;  
      font-weight: 600;
      margin-bottom: 10px;
    }

    h2 {
      font-size: 25px;
      font-weight: 600;
      margin-bottom: 10px;
    }

    h3 {
      font-size: 20px;
      font-weight: 600;
      margin-bottom: 10px;
    }

    h4 {
      font-size: 18px;
      font-weight: 600;
      margin-top: 10px;
      margin-bottom: 10px;
    }

    h5 {
      font-size: 16px;
      font-weight: 600;
      margin-top: 10px;
      margin-bottom: 10px;
    }

    ul, ol {
      padding: 0 1rem;
      padding-left: 20px;
      list-style-type: decimal;
    }


    &:focus {
      outline: none !important;
      outline-style: none !important;
      box-shadow: none !important;
    }

    // Code Block
    pre {
    background: #0d0d0d;
    border-radius: 0.5rem;
    color: #fff;
    font-family: "JetBrainsMono", monospace;
    padding: 0.75rem 1rem;

    code {
      background: none;
      color: inherit;
      font-size: 0.8rem;
      padding: 0;
    }

    .hljs-comment,
    .hljs-quote {
      color: #616161;
    }

    .hljs-variable,
    .hljs-template-variable,
    .hljs-attribute,
    .hljs-tag,
    .hljs-name,
    .hljs-regexp,
    .hljs-link,
    .hljs-name,
    .hljs-selector-id,
    .hljs-selector-class {
      color: #f98181;
    }

    .hljs-number,
    .hljs-meta,
    .hljs-built_in,
    .hljs-builtin-name,
    .hljs-literal,
    .hljs-type,
    .hljs-params {
      color: #fbbc88;
    }

    .hljs-string,
    .hljs-symbol,
    .hljs-bullet {
      color: #b9f18d;
    }

    .hljs-title,
    .hljs-section {
      color: #faf594;
    }

    .hljs-keyword,
    .hljs-selector-tag {
      color: #70cff8;
    }

    .hljs-emphasis {
      font-style: italic;
    }

    .hljs-strong {
      font-weight: 700;
    }
  }
}


`;

export default Canva;
