const { registerBlockType } = wp.blocks;
const { RichText, InspectorControls, ColorPalette, BlockControls, AlignmentToolbar } = wp.blockEditor;
const { PanelBody } = wp.components;

// Logo block
import { ReactComponent as Logo } from '../iconosvg.svg';


registerBlockType('myboxes/boxes', {
    title: 'BoxColor', 
    icon: { src: Logo }, 
    category: 'ThemeBloks', 
    attributes: {
        headingBox: {
            type: 'string', 
            source: 'html',
            selector: '.box h2'
        }, 
        textoBox: {
            type: 'string', 
            source: 'html', 
            selector : '.box p'
        }, 
        BackgroundColor: {
            type: 'string'
        },
        TextColor: {
            type: 'string'
        }, 
        AlignmentContent: {
            type: 'string',
            default: 'center'
        }
    },
    edit: (props) => {
    
        // Extract content from props
        const { attributes: { headingBox, textoBox, BackgroundColor, TextColor, AlignmentContent }, setAttributes } = props;

        const onChangeHeadingBox = newHeading => {
            setAttributes({ headingBox : newHeading });
        }
        const onChangeTextoBox = newText => {
            setAttributes({ textoBox : newText })
        }

        const onChangeBackgroundColor = newColor => {
            setAttributes({ BackgroundColor: newColor })
        }
        const onChangeTextColor = newColor => {
            setAttributes({ TextColor : newColor })
        }
        const onChangeAlignmentContent = nuevaAlineacion => {
            setAttributes({ AlignmentContent : nuevaAlineacion })
        }

        return(
            <>
                <InspectorControls>
                    <PanelBody
                        title={'background color'}
                        initialOpen={true}
                    >
                        <div className="components-base-control">
                            <div className="components-base-control__field">
                                <label className="components-base-control__label">
                                background color
                                </label>
                                <ColorPalette 
                                    onChange={onChangeBackgroundColor}
                                    value={BackgroundColor}
                                />

                            </div>
                        </div>
                    </PanelBody>
                    <PanelBody
                        title={'Text Color'}
                        initialOpen={false}
                    >
                        <div className="components-base-control">
                            <div className="components-base-control__field">
                                <label className="components-base-control__label">
                                    Text Color
                                </label>
                                <ColorPalette 
                                    onChange={onChangeTextColor}
                                    value={TextColor}
                                />
                            </div>
                        </div>
                    </PanelBody>
                </InspectorControls>

                <BlockControls>
                    <AlignmentToolbar 
                        onChange={onChangeAlignmentContent}
                    />
                </BlockControls>


                <div className="box" style={{ backgroundColor : BackgroundColor, textAlign : AlignmentContent }}>
                    <h2 style={{ color: TextColor }}>
                        <RichText 
                            placeholder="Add the Header"
                            onChange={onChangeHeadingBox}
                            value={headingBox}
                        />
                    </h2>
                    <p style={{ color: TextColor }}>
                        <RichText 
                            placeholder="Add the Text"
                            onChange={onChangeTextoBox}
                            value={textoBox}
                        />
                    </p>
                </div>
            </>
        )
    },
    save: (props) => {
    

        // Extract content from props
        const { attributes: { headingBox, textoBox, BackgroundColor, TextColor, AlignmentContent } } = props;

        return(
            <div className="box" style={{ backgroundColor : BackgroundColor, textAlign : AlignmentContent }}>
                <h2 style={{ color: TextColor }}>
                    <RichText.Content value={headingBox} />
                </h2>
                <p style={{ color: TextColor }}>
                    <RichText.Content value={textoBox} />
                </p>
            </div>
        )
    }
});