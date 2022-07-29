import { channelMention } from "@discordjs/builders";
import { Channel, ChannelManager, Client } from "discord.js";
import { ICommand } from "wokcommands";
import { client } from "..";
import {readFileSync, promises as fsPromises} from 'fs';

const letterDicts = [
readFileSync('D:/AnagramsBot/dictionary/2letter.txt', 'utf-8'),
readFileSync('D:/AnagramsBot/dictionary/3letter.txt', 'utf-8'),
readFileSync('D:/AnagramsBot/dictionary/4letter.txt', 'utf-8'),
readFileSync('D:/AnagramsBot/dictionary/5letter.txt', 'utf-8'),
readFileSync('D:/AnagramsBot/dictionary/6letter.txt', 'utf-8'),
readFileSync('D:/AnagramsBot/dictionary/7letter.txt', 'utf-8'),
readFileSync('D:/AnagramsBot/dictionary/8letter.txt', 'utf-8'),
readFileSync('D:/AnagramsBot/dictionary/9letter.txt', 'utf-8'),
readFileSync('D:/AnagramsBot/dictionary/10letter.txt', 'utf-8'),
readFileSync('D:/AnagramsBot/dictionary/11letter.txt', 'utf-8'),
readFileSync('D:/AnagramsBot/dictionary/12letter.txt', 'utf-8'),
readFileSync('D:/AnagramsBot/dictionary/13letter.txt', 'utf-8'),
readFileSync('D:/AnagramsBot/dictionary/14letter.txt', 'utf-8'),
readFileSync('D:/AnagramsBot/dictionary/15letter.txt', 'utf-8'),
]

function genWord(length:number) {
    
    const alphabet = 'AAABBBCCCDDDEEEFFFGGGHHHIIIJJJKKKLLLMMMNNNOOOPPPQQQRRRSSSTTTUUUVVVWWWXXXYYYZZZ';
    let wordWorks = false;
    let word:string = 'none'
    do {
        let randomindex = Math.floor(Math.floor(Math.random() * 184261)/6) * 6
        word = letterDicts[length-2].replace(/\s/g,'').substring(randomindex, randomindex +6)
        for (let index = 0; index < 26; index+=3) 
        {
            if(word.split('').sort().join('').toUpperCase().includes(alphabet.substring(index, index+2)))
            {
                wordWorks = false
            }
            else
            {
                wordWorks = true;
            }
        }
        console.log(word)
        console.log(randomindex)
    } while (wordWorks === false);
        return word;
}



function isAnagram(board:string, word:string) {
    const boardSorted = board.split('').sort().join('');
    const wordSorted = word.split('').sort().join('');
    const alphabet = 'AABBCCDDEEFFGGHHIIJJKKLLMMNNOOPPQQRRSSTTUUVVWWXXYYZZ';
    let doubleLetterBoard = 'none';
    if(letterDicts[word.length-2].includes(word.toUpperCase()) === true)
    {
        console.log('is a word')
        for (let index = 0; index <=   52; index+=2) 
        {
            if(boardSorted.toUpperCase().includes(alphabet.substring(index, index+1)))
            {
                console.log('double letter board')
                if(doubleLetterBoard === 'none')
                {
                    doubleLetterBoard = alphabet.substring(index, index);
                }
                else
                {
                    doubleLetterBoard += alphabet.substring(index, index);
                }
            }
        }
        if(true)
        {
            let i = 0;
            while (i <= word.length) {
                if(boardSorted.includes(wordSorted.substring(i, i)))
                {
                    i++;
                }
                else 
                {
                    console.log('not an anagram')
                    return false;
                }
            }
            if(i >= word.length)
            {
                console.log('true')
                return true;
            }
        }
    }
    else
    {
        console.log('not a word')
        return false;
    }
}

export default {
    category: 'Testing',
    description: 'test',

    

    callback: ({ message }) => {
        const userId = message.author.id
        let wordsent = false;
        const board = genWord(6);
        message.guild?.channels.create('test')
            .then((ch) => {
                ch.send('send anything to start')
                client.on('messageCreate', (msg) => {
                    if(msg.author.bot)
                    {
                        return
                    }

                    if(msg.channel !== ch)
                    {
                        return
                    }

                    if(message.author.id !== userId)
                    {
                        console.log(message.author.username)
                    }
                    if(wordsent === true)
                    {
                        if(isAnagram(board, msg.toString().toUpperCase()))
                        {
                            ch.send('yup')
                        }
                        else
                        {
                            if(isAnagram(board, msg.toString().toUpperCase()))
                            {
                                console.log('returned false')
                                ch.send('no')
                            }
                            console.log('not true or false')
                        }
                    }
                    else
                    {
                        ch.send(board)
                        wordsent = true;
                    }
                })
            })
    }
} as ICommand