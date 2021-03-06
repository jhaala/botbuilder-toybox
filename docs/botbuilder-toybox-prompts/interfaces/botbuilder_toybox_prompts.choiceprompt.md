[Bot Builder Toybox - Prompts](../README.md) > [ChoicePrompt](../interfaces/botbuilder_toybox_prompts.choiceprompt.md)



# Interface: ChoicePrompt


Prompts the user to select from a list of choices.

## Type parameters
#### O 

## Properties
<a id="recognizeroptions"></a>

###  recognizerOptions

**●  recognizerOptions**:  *[FindChoicesOptions]()* 

*Defined in [packages/botbuilder-toybox-prompts/lib/choicePrompt.d.ts:33](https://github.com/Stevenic/botbuilder-toybox/blob/848ed38/packages/botbuilder-toybox-prompts/lib/choicePrompt.d.ts#L33)*



Additional options used to configure the choice recognizer.




___

<a id="style"></a>

###  style

**●  style**:  *[ListStyle](../enums/botbuilder_toybox_prompts.liststyle.md)* 

*Defined in [packages/botbuilder-toybox-prompts/lib/choicePrompt.d.ts:29](https://github.com/Stevenic/botbuilder-toybox/blob/848ed38/packages/botbuilder-toybox-prompts/lib/choicePrompt.d.ts#L29)*



Style of choices sent to user when [prompt()](#prompt) is called. Defaults to `ListStyle.auto`.




___

<a id="styleroptions"></a>

###  stylerOptions

**●  stylerOptions**:  *[ChoiceStylerOptions]()* 

*Defined in [packages/botbuilder-toybox-prompts/lib/choicePrompt.d.ts:31](https://github.com/Stevenic/botbuilder-toybox/blob/848ed38/packages/botbuilder-toybox-prompts/lib/choicePrompt.d.ts#L31)*



Additional options used to configure the output of the choice styler.




___


## Methods
<a id="prompt"></a>

###  prompt

► **prompt**(context: *[BotContext]()*, choices: *(`string`⎮[Choice]())[]*, prompt?: *`string`⎮[Partial]()[Activity]()*, speak?: *`undefined`⎮`string`*): `Promise`.<`void`>



*Defined in [packages/botbuilder-toybox-prompts/lib/choicePrompt.d.ts:41](https://github.com/Stevenic/botbuilder-toybox/blob/848ed38/packages/botbuilder-toybox-prompts/lib/choicePrompt.d.ts#L41)*



Sends a formated prompt to the user.


**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| context | [BotContext]()   |  Context for the current turn of conversation. |
| choices | (`string`⎮[Choice]())[]   |  Array of choices that should be prompted for. |
| prompt | `string`⎮[Partial]()[Activity]()   |  (Optional) Text or activity to send as the prompt. |
| speak | `undefined`⎮`string`   |  (Optional) SSML that should be spoken for prompt. The prompts `inputHint` will be automatically set to `expectingInput`. |





**Returns:** `Promise`.<`void`>





___

<a id="recognize"></a>

###  recognize

► **recognize**(context: *[BotContext]()*, choices: *(`string`⎮[Choice]())[]*): `Promise`.<`O`⎮`undefined`>



*Defined in [packages/botbuilder-toybox-prompts/lib/choicePrompt.d.ts:47](https://github.com/Stevenic/botbuilder-toybox/blob/848ed38/packages/botbuilder-toybox-prompts/lib/choicePrompt.d.ts#L47)*



Recognizes and validates the users reply.


**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| context | [BotContext]()   |  Context for the current turn of conversation. |
| choices | (`string`⎮[Choice]())[]   |  Array of choices that should be recognized against. |





**Returns:** `Promise`.<`O`⎮`undefined`>





___


