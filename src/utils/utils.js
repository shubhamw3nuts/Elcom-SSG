const { decode } = require('html-entities');

export function removeHTMLTags(str) {
    return str.replace(/<[^>]*>?/gm, '');
    // const doc = new DOMParser().parseFromString(str, 'text/html');
    // return doc.body.textContent || '';
}

export function formatDate(fullDate) {
    const date = new Date(fullDate);
    const day = date.getDate();
    //   const month = date.toLocaleString('default', { month: 'long' });
    const month = date.getMonth();
    const year = date.getFullYear();
    const formattedDay = day <= 9 ? `0${day}` : day;
    const formattedMonth = month <= 9 ? `0${month + 1}` : month;

    return `${formattedDay}/${formattedMonth}/${year}`;
}

export function formatFileSize(fileSizeInBytes, round = true) {
    if (fileSizeInBytes < 1024) {
        return fileSizeInBytes + ' B'; // If size is less than 1KB, show in bytes
    } else if (fileSizeInBytes < 1024 * 1024) {
        const sizeInKB = fileSizeInBytes / 1024;
        const formattedSize = round ? Math.round(sizeInKB) : Math.ceil(sizeInKB);
        return formattedSize % 1 === 0 ? formattedSize + ' KB' : formattedSize.toFixed(2) + ' KB';
    } else {
        const sizeInMB = fileSizeInBytes / (1024 * 1024);
        const formattedSize = round ? Math.round(sizeInMB) : Math.ceil(sizeInMB);
        return formattedSize % 1 === 0 ? formattedSize + ' MB' : formattedSize.toFixed(2) + ' MB';
    }
}

export function getFileExtensionFromMimeType(mimeType) {
    const parts = mimeType.split('/');
    if (parts.length === 2) {
        return parts[1].toUpperCase(); // Returns the second part after the slash as the file extension
    }
    return ''; // Return empty string if unable to extract the extension
}

export function isValidEmail(email){
    // Regular expression for basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}
export function isValidPhoneNumber(phoneNumber){
    // Regular expression for 10-digit phone number validation
    const phoneRegex = /^\d{10}$/;
    return phoneRegex.test(phoneNumber);
}

export function decodeHTMLString(htmlString){
    // return htmlString.replace(/<[^>]*>?/gm, '');

    // const element = document.createElement('div');
    // element.innerHTML = htmlString;
    // return element.textContent || element.innerText;

    return decode(htmlString);

    // const parser = new DOMParser();
    // const decodedString = parser.parseFromString(htmlString, 'text/html').body.textContent;
    // return decodedString;
};

export function ShortenedFilename(filename){
    let maxLength = 20;
    // Get the filename and extension
    const lastDotIndex = filename.lastIndexOf('.');
    const name = filename.substring(0, lastDotIndex);
    const extension = filename.substring(lastDotIndex);

    // Shorten the filename to the specified length
    const shortenedName = name.length > maxLength ? `${name.substring(0, maxLength)}...` : name;

    // Concatenate the shortened name with three dots and the file extension
    const shortenedFilename = `${shortenedName}${extension}`;

    return shortenedFilename;
}

export function FullDateWithYear(inputDate){
    const date = new Date(inputDate);
    const day = date.getDate();
    const month = date.toLocaleString('default', { month: 'long' });
    const year = date.getFullYear();

    let suffix = 'th';
    if (day === 1 || day === 21 || day === 31) {
        suffix = 'st';
    } else if (day === 2 || day === 22) {
        suffix = 'nd';
    } else if (day === 3 || day === 23) {
        suffix = 'rd';
    }

    return `${day}${suffix} ${month} ${year}`;
}

export function CountryList(){
    return [
        { value: 'Afghanistan', label: 'Afghanistan' },
        { value: 'Albania', label: 'Albania' },
        { value: 'Algeria', label: 'Algeria' },
        { value: 'Andorra', label: 'Andorra' },
        { value: 'Angola', label: 'Angola' },
        { value: 'Antigua and Barbuda', label: 'Antigua and Barbuda' },
        { value: 'Argentina', label: 'Argentina' },
        { value: 'Armenia', label: 'Armenia' },
        { value: 'Australia', label: 'Australia' },
        { value: 'Austria', label: 'Austria' },
        { value: 'Azerbaijan', label: 'Azerbaijan' },
        { value: 'Bahamas', label: 'Bahamas' },
        { value: 'Bahrain', label: 'Bahrain' },
        { value: 'Bangladesh', label: 'Bangladesh' },
        { value: 'Barbados', label: 'Barbados' },
        { value: 'Belarus', label: 'Belarus' },
        { value: 'Belgium', label: 'Belgium' },
        { value: 'Belize', label: 'Belize' },
        { value: 'Benin', label: 'Benin' },
        { value: 'Bhutan', label: 'Bhutan' },
        { value: 'Bolivia', label: 'Bolivia' },
        { value: 'Bosnia and Herzegovina', label: 'Bosnia and Herzegovina' },
        { value: 'Botswana', label: 'Botswana' },
        { value: 'Brazil', label: 'Brazil' },
        { value: 'Brunei', label: 'Brunei' },
        { value: 'Bulgaria', label: 'Bulgaria' },
        { value: 'Burkina Faso', label: 'Burkina Faso' },
        { value: 'Burundi', label: 'Burundi' },
        { value: 'Cabo Verde', label: 'Cabo Verde' },
        { value: 'Cambodia', label: 'Cambodia' },
        { value: 'Cameroon', label: 'Cameroon' },
        { value: 'Canada', label: 'Canada' },
        { value: 'Central African Republic', label: 'Central African Republic' },
        { value: 'Chad', label: 'Chad' },
        { value: 'Chile', label: 'Chile' },
        { value: 'China', label: 'China' },
        { value: 'Colombia', label: 'Colombia' },
        { value: 'Comoros', label: 'Comoros' },
        { value: 'Congo', label: 'Congo' },
        { value: 'Costa Rica', label: 'Costa Rica' },
        { value: 'Croatia', label: 'Croatia' },
        { value: 'Cuba', label: 'Cuba' },
        { value: 'Cyprus', label: 'Cyprus' },
        { value: 'Czechia', label: 'Czechia' },
        { value: 'Denmark', label: 'Denmark' },
        { value: 'Djibouti', label: 'Djibouti' },
        { value: 'Dominica', label: 'Dominica' },
        { value: 'Dominican Republic', label: 'Dominican Republic' },
        { value: 'Ecuador', label: 'Ecuador' },
        { value: 'Egypt', label: 'Egypt' },
        { value: 'El Salvador', label: 'El Salvador' },
        { value: 'Equatorial Guinea', label: 'Equatorial Guinea' },
        { value: 'Eritrea', label: 'Eritrea' },
        { value: 'Estonia', label: 'Estonia' },
        { value: 'Eswatini', label: 'Eswatini' },
        { value: 'Ethiopia', label: 'Ethiopia' },
        { value: 'Fiji', label: 'Fiji' },
        { value: 'Finland', label: 'Finland' },
        { value: 'France', label: 'France' },
        { value: 'Gabon', label: 'Gabon' },
        { value: 'Gambia', label: 'Gambia' },
        { value: 'Georgia', label: 'Georgia' },
        { value: 'Germany', label: 'Germany' },
        { value: 'Ghana', label: 'Ghana' },
        { value: 'Greece', label: 'Greece' },
        { value: 'Grenada', label: 'Grenada' },
        { value: 'Guatemala', label: 'Guatemala' },
        { value: 'Guinea', label: 'Guinea' },
        { value: 'Guinea-Bissau', label: 'Guinea-Bissau' },
        { value: 'Guyana', label: 'Guyana' },
        { value: 'Haiti', label: 'Haiti' },
        { value: 'Honduras', label: 'Honduras' },
        { value: 'Hungary', label: 'Hungary' },
        { value: 'Iceland', label: 'Iceland' },
        { value: 'India', label: 'India' },
        { value: 'Indonesia', label: 'Indonesia' },
        { value: 'Iran', label: 'Iran' },
        { value: 'Iraq', label: 'Iraq' },
        { value: 'Ireland', label: 'Ireland' },
        { value: 'Israel', label: 'Israel' },
        { value: 'Italy', label: 'Italy' },
        { value: 'Jamaica', label: 'Jamaica' },
        { value: 'Japan', label: 'Japan' },
        { value: 'Jordan', label: 'Jordan' },
        { value: 'Kazakhstan', label: 'Kazakhstan' },
        { value: 'Kenya', label: 'Kenya' },
        { value: 'Kiribati', label: 'Kiribati' },
        { value: 'Korea, North', label: 'Korea, North' },
        { value: 'Korea, South', label: 'Korea, South' },
        { value: 'Kosovo', label: 'Kosovo' },
        { value: 'Kuwait', label: 'Kuwait' },
        { value: 'Kyrgyzstan', label: 'Kyrgyzstan' },
        { value: 'Laos', label: 'Laos' },
        { value: 'Latvia', label: 'Latvia' },
        { value: 'Lebanon', label: 'Lebanon' },
        { value: 'Lesotho', label: 'Lesotho' }
    ]
}


export function processVideoURL(videoURL){
    if (videoURL.includes('youtube.com')) {
        if (videoURL.includes('autoplay')) {
            return videoURL;
        } else {
            const separator = videoURL.includes('?') ? '&' : '?';
            const autoplayURL = `${videoURL}${separator}autoplay=1&mute=1`;
            return autoplayURL;
        }
    } else if (videoURL.includes('vimeo.com')) {
        if (videoURL.includes('autoplay=1')) {
            return videoURL;
        } else {
            const separator = videoURL.includes('?') ? '&' : '?';
            const autoplayURL = `${videoURL}${separator}autoplay=1&loop=1&autopause=0`;
            return autoplayURL;
        }
    } else {
        return videoURL;
    }
}

export function wrapInPTag(content) {
    // Check if the content contains HTML tags
    const hasHTMLTags = /<[^>]*>/g.test(content);
  
    if (!hasHTMLTags) {
      // If the content does not have HTML tags, wrap it in a <p> tag
      return `<p>${content}</p>`;
    } else {
      // If the content already contains HTML tags, return it as is
      return content;
    }
  }