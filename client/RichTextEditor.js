import React, { useState, useRef } from 'react';

import { Editor, getTinymce } from '@tinymce/tinymce-react';
import { CircularProgress } from '@material-ui/core';


const RichTextEditor = (props) => {
    const [loading, setLoading] = useState(true);
    const [focus, setFocus] = useState(false);
    
    // Random ref for toolbar container id
    const toolbarContainer = useRef(`mke-edit-${(Math.trunc(Math.random() * 0xFFFFF)).toString(16)}`);

    return (
        <div style={{
            border: (focus ? '2px solid #039BE5' : '1px solid gray'), 
            borderRadius: 5, 
            textAlign: 'left',
            padding: (focus ? 0 : 1),
            width: '90%', 
            height: 250,
            ...props.style,
            }}>
            {loading && <CircularProgress />}
            <div id={toolbarContainer.current}
                style={{
                    height: 39,
                }}></div>
            <div style={{
                    height: 203,
                    overflowY: 'scroll',
                    padding: 4,
                }}>
                <Editor
                    apiKey="8owmaqt97ssegw4b2kgx45y2ivg5vh79nec7qcf5wax12s0p"
                    inline
                    toolbar_mode={"wrap"}
                    init={{
                        width: '100%',
                        menubar: false,
                        plugins: [
                            'advlist autolink lists link',
                            'searchreplace paste'
                        ],
                        fixed_toolbar_container: `#${toolbarContainer.current}`,
                        toolbar_sticky: true,
                        toolbar:
                        'undo redo | h2 h3 paragraph | bold italic blockquote | bullist numlist outdent indent | removeformat',
                        init_instance_callback: (e) => {
                            e.editorManager.activeEditor.focus();
                        },
                        setup: function (editor) {
                            // Hack to keep the thing around
                            editor.on('focus', () => {
                                setFocus(true);
                            })
                            editor.on('blur', () => {
                                setFocus(false);
                                return false;
                            });
                            editor.on('init', () => {
                                setLoading(false);
                            });
                        }
                    }}
                    {...props}
                />
            </div>
           
        </div>
    )
};

export default RichTextEditor;