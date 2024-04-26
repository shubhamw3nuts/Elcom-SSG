const Logo = ({logo_svg}) => {
    return (
        <div dangerouslySetInnerHTML={{__html: logo_svg}} className="custom_html_logo"></div>
    )
}

export default Logo