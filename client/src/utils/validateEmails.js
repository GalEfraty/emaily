//a regex helper from https://emailregex.com/ that helps to validate email.
const re = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

export default emails => {
  const invalidEmails = emails
    .split(",")
    .map(email => email.trim())
    .filter(email => re.test(email) === false)
    .join(" , ");

  if (invalidEmails.length) {
    return `These emails are invalid: ${invalidEmails}`;
  }

  return;
};
