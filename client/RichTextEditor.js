import React, { useState, useRef } from 'react';

import { Editor, getTinymce } from '@tinymce/tinymce-react';
import { CircularProgress } from '@material-ui/core';
import { withStyles } from '@material-ui/styles';


const styles = theme => ({
    root: {
        textAlign: 'left',
        display: 'block',
        overflow: 'auto',
        paddingTop: theme.spacing(0),
        paddingBottom: theme.spacing(0),
        marginTop: 0,
        marginBottom: 0,
    },
    editorContainer: {
        borderRadius: '5px 5px 0px 0px', 
        backgroundColor: '#5A5A5A',
        display: 'block',
        overflow: 'auto',
        padding: 6,
    },
    toolbarVisible: {
        bottom: 0,
        opacity: 1,
        // height: 39,
        transition: 'opacity 0.5s, bottom 0.5s',
    },
    toolbarHidden: {
        bottom: -70,
        opacity: 0,
        // height: 0,
        transition: 'opacity 0.5s, bottom 0.5s',
    }
});

const RichTextEditor = (props) => {
    const classes = props.classes;

    const [loading, setLoading] = useState(true);
    const [focus, setFocus] = useState(false);
    const [editor, setEditor] = useState(null);
    
    // Random ref for toolbar container id
    const toolbarContainer = useRef(`mke-edit-${(Math.trunc(Math.random() * 0xFFFFF)).toString(16)}`);

    return (
        <div className={classes.root} 
            style={{
            ...props.style,
        }}>
            <div id={toolbarContainer.current}
                className={focus ? classes.toolbarVisible : classes.toolbarHidden}
                // These need to be inline to override TinyMce styles
                style={{
                    position: 'fixed',
                    zIndex: 10,
                    left: 0,
                    width: '100%',
                    height: 39,
                    textAlign: 'center',
                    color: 'black',
                }}>
            </div>
            <div className={classes.editorContainer} 
                 style={{
                        borderBottom: (focus ? '2px solid #039BE5' : '1px solid white'), 
                        minHeight: props.height || 200,
                 }}
                 onClick={() => {
                    if(editor && !focus) {
                        editor.focus();
                    }
                }}>
                {loading && <CircularProgress />}
                <Editor
                    apiKey="8owmaqt97ssegw4b2kgx45y2ivg5vh79nec7qcf5wax12s0p"
                    inline
                    toolbar_mode={"wrap"}
                    style={{minHeight: props.height || 200}}
                    init={{
                        width: '100%',
                        theme_advanced_resizing_min_height: props.height || 200,
                        placeholder: props.placeholder || "",
                        block_formats: 'Paragraph=p; Header 2=h2; Header 3=h3',
                        menubar: false,
                        plugins: [
                            'advlist autolink lists link',
                            'searchreplace paste'
                        ],
                        fixed_toolbar_container: `#${toolbarContainer.current}`,
                        toolbar_sticky: true,
                        toolbar:
                        'undo redo | h2 h3 lineheight | bold italic blockquote | bullist numlist outdent indent | removeformat',
                        init_instance_callback: (e) => {
                            if(!editor) {
                                setEditor(e.editorManager.activeEditor);
                            }
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