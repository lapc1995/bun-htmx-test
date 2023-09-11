import { Elysia, ws } from 'elysia'
import { html } from '@elysiajs/html'
import * as database from './database'
import { Message } from './types/Message'

database.init();

new Elysia()
    .use(html())
    .get('/', () => (
        <html lang="en">
            <head>
                <title>Hello World</title>
                <script src="https://unpkg.com/htmx.org@1.9.5"></script>
                <script src="https://cdn.tailwindcss.com"></script>
            </head>
            <body>
                <div class="page-container flex flex-auto flex-col justify-center items-center h-screen">              
                    <div class="chat-container container mx-auto bg-indigo-500 w-[60rem] h-[50rem] rounded-lg border-4 border-black">
                        <div class="grid grid-cols-3 grid-rows-1 auto-cols-max" >
                        
                            <div class="col-start-1 flex bg-[#e6e6ea] basis-full h-[50rem]">
                              
                            </div>

                            <div class="col-start-2 col-span-3 flex bg-[#f4f4f8] h-[50rem] flex-col">
                                <div class="flex flex-col w-full h-full overflow-y-auto flex-col-reverse" hx-get="/messages" hx-trigger="every 1s">
                                    {
                                        loadMessages()
                                    }
                                </div>
                                <form class="flex flex-row h-20" hx-post="/sendMessage">
                                    <input name="message" type="text" class="w-full bg-gray-200" placeholder="Type your message here..."></input>
                                    <button class="w-20 bg-gray-200">Send</button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </body>
        </html>
    ))
    .post('/sendMessage', ({body}) =>  {
        console.log(body);

        var newMessage = {
            message: body['message'],
            date: new Date(),
            author: "1",
            recipient: "2"
        } as Message;

        database.addMessage(newMessage);
        return (
        <div>
            <h1>{body['message']}</h1>
        </div>)
    })
    .get('/messages', () => {
        return loadMessages()
    })
    .listen(3000)

    function getMessageComponent(message: string, left : boolean = true) {
        if(left) {
            return (
                <div class="flex flex-row w-full">
                    <div class='rounded-lg border-4 bg-[#2ab7ca] p-6 text-white'>
                        {message}
                    </div>                            
                </div>
            );
        }

        return (
            <div class="flex flex-row w-full flex-row-reverse">
                <div class='rounded-lg border-4 bg-[#fe4a49] p-6 text-white'>
                    {message}
                </div>                            
            </div>
        );
    }

    function loadMessages() {
        var messages = database.getAllMessages();
        messages.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
        var messageComponents = [];
        for(var i = 0; i < messages.length; i++) {
            messageComponents.push(getMessageComponent(messages[i].message, i % 2 == 0));
        }
        return messageComponents.join('');


        /*
        return (
            <div>
            { getMessageComponent("Hello") }
            { getMessageComponent("Hello to you too", false) }
            </div>
        )*/
    }