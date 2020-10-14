import React, { useState, useRef } from 'react';

import { Editor, getTinymce } from '@tinymce/tinymce-react';
import { CircularProgress } from '@material-ui/core';
import { withStyles } from '@material-ui/styles';


const styles = theme => ({
    root: {
        textAlign: 'left',
        display: 'block',
        overflow: 'auto',
        paddingTop: theme.spacing(1),
        paddingBottom: theme.spacing(1),
    },
    editorContainer: {
        minHeight: 200,
        borderRadius: '5px 5px 0px 0px', 
        backgroundColor: '#5A5A5A',
        display: 'block',
        overflow: 'auto',
        padding: 6,
    },
    editorToolbar: {

    }
});

const RichTextEditor = (props) => {
    const classes = props.classes;

    const [loading, setLoading] = useState(true);
    const [focus, setFocus] = useState(false);
    
    // Random ref for toolbar container id
    const toolbarContainer = useRef(`mke-edit-${(Math.trunc(Math.random() * 0xFFFFF)).toString(16)}`);

    return (
        <div className={classes.root} 
            style={{
            ...props.style,
        }}>
            <div id={toolbarContainer.current}
                style={{
                    zIndex: 10,
                    height: 39,
                    position: 'fixed',
                    bottom: 0,
                    left: 0,
                    width: '100%',
                    textAlign: 'center',
                }}></div>
            <div className={classes.editorContainer} 
                 style={{
                        borderBottom: (focus ? '2px solid #039BE5' : '1px solid white'), 
            }}>
                {loading && <CircularProgress />}
                <Editor
                    apiKey="8owmaqt97ssegw4b2kgx45y2ivg5vh79nec7qcf5wax12s0p"
                    inline
                    toolbar_mode={"wrap"}
                    init={{
                        width: '100%',
                        theme_advanced_resizing_min_height: 200,
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
                            // e.editorManager.activeEditor.focus();
                        },
                        setup: function (editor) {
                            // Hack to keep the thing around
                            editor.on('focus', () => {
                                setFocus(true);
                            })
                            editor.on('blur', (evt) => {
                                setFocus(false);
                                evt.preventDefault();
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

export default withStyles(styles)(RichTextEditor);