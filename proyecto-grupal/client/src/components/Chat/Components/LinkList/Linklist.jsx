import React from "react"
import "./LinkList.css"
const LinkList = (props) => {
    //voy a renderizar cada una de las opciones que me llegan por props
    const linkMarkup = props?.options?.map((link) => {
        return(
            <li key={link.id} className="link-list-item">
                <a href={link.url}  rel="noopener noreferrer" className="link-list-item-url"
                >
                    {link.text}
                </a>
            </li>
        )
    })
    return <ul className="link-list">{linkMarkup}</ul>
}
export default LinkList;