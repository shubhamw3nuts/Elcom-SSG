import Link from "next/link";

const InnerMenu = ({data}) => {
    let subCategory = data?.node?.label;
    let subCategoryUri = data?.node?.uri;
    let subSubCategoryData = data?.node?.childItems?.edges;
    return (
        <>
        <div className="innerMenu">
                <Link href={subCategoryUri || "javascript:void(0)"}>{subCategory}</Link>
            {subSubCategoryData 
            && 
            <ul>
                {subSubCategoryData.map((subsubCat,index) => {
                    let subSubCatLabel = subsubCat.node.label;
                    let subSubCatUri = subsubCat.node.uri;
                    return (
                        <li key={index}><Link href={subSubCatUri || "javascript:void(0)"}>{subSubCatLabel}</Link></li>
                    )
                })}
            </ul>
            }
        </div>
        
        </>
    )
}

export default InnerMenu;