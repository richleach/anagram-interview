

export async function sendWelcomeEmail(email: string) {
    // Simulate network delay for an email service
    await new Promise((resolve) => setTimeout(resolve, 500));

    console.log(`
    [EMAIL SERVICE] -- Sending Welcome Email
    ---------------------------------------------------
    To: ${email}
    Subject: Welcome to the Acme Corp!
    Body: We are glad to have you with us.
    ---------------------------------------------------
    `);
}