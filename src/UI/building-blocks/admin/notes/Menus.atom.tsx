import {BubbleMenu, Editor} from '@tiptap/react'


export const NotesMenuAtom = ({editor}: {
  editor: Editor
}) => {
  if (!editor) {
    return null
  }

  return <BubbleMenu editor={editor} tippyOptions={{duration: 100}}>
    <div className="editor__bubble-menu">
      <button
        onClick={() => editor.chain()
          .focus()
          .toggleBold()
          .run()}
        className={editor.isActive('bold')
          ? 'is-active'
          : ''}
      >
        Bold
      </button>
      <hr style={{margin: '2px'}}/>
      <button
        onClick={() => editor.chain()
          .focus()
          .setParagraph()
          .run()}
        className={editor.isActive('paragraph')
          ? 'is-active'
          : ''}
      >
        Normal
      </button>
      <button
        onClick={() => editor.chain()
          .focus()
          .toggleHeading({level: 1})
          .run()}
        className={editor.isActive(
          'heading',
          {level: 1})
          ? 'is-active'
          : ''}
      >
        H1
      </button>
      <button
        onClick={() => editor.chain()
          .focus()
          .toggleHeading({level: 2})
          .run()}
        className={editor.isActive(
          'heading',
          {level: 2})
          ? 'is-active'
          : ''}
      >
        H2
      </button>
      <button
        onClick={() => editor.chain()
          .focus()
          .toggleHeading({level: 3})
          .run()}
        className={editor.isActive(
          'heading',
          {level: 3})
          ? 'is-active'
          : ''}
      >
        H3
      </button>
    </div>
  </BubbleMenu>
}


export const NotesMenuBarAtom = ({editor}: {
  editor: Editor
}) => {
  if (!editor) {
    return null
  }

  return <div className="editor__menu-bar">
    <button
      onClick={() => editor.chain()
        .focus()
        .setHardBreak()
        .run()}
      className={editor.isActive('hardBreak')
        ? 'is-active'
        : ''}>Hard break
    </button>
    <button
      onClick={() => editor.chain()
        .focus()
        .toggleBulletList()
        .run()}
      className={editor.isActive('bulletList')
        ? 'is-active'
        : ''}
    >
      Bullet list
    </button>
    <button
      onClick={() => editor.chain()
        .focus()
        .toggleOrderedList()
        .run()}
      className={editor.isActive('orderedList')
        ? 'is-active'
        : ''}
    >
      Ordered list
    </button>
    <button
      onClick={() => editor.chain()
        .focus()
        .toggleCodeBlock()
        .run()}
      className={editor.isActive('codeBlock')
        ? 'is-active'
        : ''}
    >
      Code block
    </button>
    <button onClick={() => editor.chain()
      .focus()
      .setHorizontalRule()
      .run()}>
      Set line
    </button>

    <button onClick={() => editor.chain()
      .focus()
      .undo()
      .run()}>
      UNDO
    </button>
    <button onClick={() => editor.chain()
      .focus()
      .redo()
      .run()}>
      REDO
    </button>
  </div>
}
