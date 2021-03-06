import { Bot, MemoryStorage, BotStateManager } from 'botbuilder';
import { BotFrameworkAdapter } from 'botbuilder-services';
import {  
    createAttachmentPrompt, createChoicePrompt, createConfirmPrompt, 
    createDatetimePrompt, createNumberPrompt, createTextPrompt
} from 'botbuilder-toybox-prompts';
import * as restify from 'restify';

// Create server
let server = restify.createServer();
server.listen(process.env.port || process.env.PORT || 3978, function () {
    console.log(`${server.name} listening to ${server.url}`);
});

// Create adapter and listen to servers '/api/messages' route.
const adapter = new BotFrameworkAdapter({ 
    appId: process.env.MICROSOFT_APP_ID, 
    appPassword: process.env.MICROSOFT_APP_PASSWORD 
});
server.post('/api/messages', <any>adapter.listen());

// Initialize bot by passing it adapter and middleware
const bot = new Bot(adapter)
    .use(new MemoryStorage())
    .use(new BotStateManager())
    .onReceive((context) => {
        if (context.request.type === 'message') {
            // Check for cancel
            const utterance = (context.request.text || '').trim().toLowerCase();
            if (utterance === 'cancel') { context.state.conversation.topic = undefined }

            // Route to topic
            switch (context.state.conversation.topic) {
                case 'textDemo':
                default:
                    return textDemo(context);
                case 'numberDemo':
                    return numberDemo(context);
                case 'confirmDemo':
                    return confirmDemo(context);
                case 'choiceDemo':
                    return choiceDemo(context);
                case 'datetimeDemo':
                    return datetimeDemo(context);
                case 'attachmentDemo':
                    return attachmentDemo(context);
            }
        }
    });


//-----------------------------------------------
// Text Prompt
//-----------------------------------------------

const textPrompt = createTextPrompt();

function textDemo(context: BotContext) {
    if (context.state.conversation.topic !== 'textDemo') {
        context.state.conversation.topic = 'textDemo';
        return textPrompt.prompt(context, `Text Prompt: enter some text.`);
    } else {
        return textPrompt.recognize(context).then((value) => {
            context.reply(`You entered: ${value}`);
            return numberDemo(context);
        });
    }
}


//-----------------------------------------------
// Number Prompt
//-----------------------------------------------

const numberPrompt = createNumberPrompt();

function numberDemo(context: BotContext) {
    if (context.state.conversation.topic !== 'numberDemo') {
        context.state.conversation.topic = 'numberDemo';
        return numberPrompt.prompt(context, `Number Prompt: enter a number.`);
    } else {
        return numberPrompt.recognize(context).then((value) => {
            if (value !== undefined) {
                context.reply(`You entered: ${value}`);
                return confirmDemo(context);
            } else {
                return numberPrompt.prompt(context, `Invalid number. enter a number like "100" or "one hundred".`);
            }
        });
    }
}


//-----------------------------------------------
// Confirm Prompt
//-----------------------------------------------

const confirmPrompt = createConfirmPrompt();

function confirmDemo(context: BotContext) {
    if (context.state.conversation.topic !== 'confirmDemo') {
        context.state.conversation.topic = 'confirmDemo';
        return confirmPrompt.prompt(context, `Confirm Prompt: answer "yes" or "no".`);
    } else {
        return confirmPrompt.recognize(context).then((value) => {
            if (value !== undefined) {
                context.reply(`You chose: ${value}`);
                return choiceDemo(context);
            } else {
                return confirmPrompt.prompt(context, `Not recognized. Answer "yes" or "no".`);
            }
        });
    }
}


//-----------------------------------------------
// Choice Prompt
//-----------------------------------------------

const choicePrompt = createChoicePrompt();

function choiceDemo(context: BotContext) {
    const choices = ['red', 'green', 'blue']; 
    if (context.state.conversation.topic !== 'choiceDemo') {
        context.state.conversation.topic = 'choiceDemo';
        return choicePrompt.prompt(context, choices, `Choice Prompt: choose a color.`);
    } else {
        return choicePrompt.recognize(context, choices).then((value) => {
            if (value !== undefined) {
                context.reply(`You chose: ${JSON.stringify(value)}`);
                return datetimeDemo(context);
            } else {
                return choicePrompt.prompt(context, choices, `Not recognized. Choose a color.`);
            }
        });
    }
}


//-----------------------------------------------
// Datetime Prompt
//-----------------------------------------------

const datetimePrompt = createDatetimePrompt();

function datetimeDemo(context: BotContext) {
    if (context.state.conversation.topic !== 'datetimeDemo') {
        context.state.conversation.topic = 'datetimeDemo';
        return datetimePrompt.prompt(context, `Datetime Prompt: enter a date or time.`);
    } else {
        return datetimePrompt.recognize(context).then((value) => {
            if (value !== undefined) {
                context.reply(`You entered: ${JSON.stringify(value)}`);
                return attachmentDemo(context);
            } else {
                return datetimePrompt.prompt(context, `Not recognized. Enter a date or time like "tomorrow at 9am".`);
            }
        });
    }
}


//-----------------------------------------------
// Attachment Prompt
//-----------------------------------------------

const attachmentPrompt = createAttachmentPrompt();

function attachmentDemo(context: BotContext) {
    if (context.state.conversation.topic !== 'attachmentDemo') {
        context.state.conversation.topic = 'attachmentDemo';
        return attachmentPrompt.prompt(context, `Attachment Prompt: upload an image or other attachment.`);
    } else {
        return attachmentPrompt.recognize(context).then((values) => {
            if (values !== undefined) {
                context.reply(`You uploaded: ${values.length} attachment(s)`);
                context.reply(`END OF DEMO`);
                return Promise.resolve();
            } else {
                return attachmentPrompt.prompt(context, `No files detected. Upload one or more attachments.`);
            }
        });
    }
}
