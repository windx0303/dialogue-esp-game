# Dialogue ESP Game

This repository contains the source code of the worker interface and the data we collected in the following paper:


Ting-Hao K. Huang, Yun-Nung Chen, Jeffrey P. Bigham.
2017.
**[Real-time On-Demand Crowd-powered Entity Extraction.](https://arxiv.org/abs/1704.03627)**
In Proc. [the 5th Edition Of The Collective Intelligence Conference](http://collectiveintelligenceconference.org/index.html) (CI 2017, oral presentation).
New York University, NY, USA.

(**arXiv:** [https://arxiv.org/abs/1704.03627](https://arxiv.org/abs/1704.03627))

(**Demo:** [Here](https://www.cs.cmu.edu/~tinghaoh/project/dialog_esp_game/demo/ESP-AMT.html), or download the repo and open ```ESP-AMT.html``` with a web browser.)

## Introduction

Output-agreement mechanisms such as ESP Game have been widely used in human computation to obtain reliable human-generated labels. In this paper, we argue that a *time-limited* output-agreement mechanism can be used to create a fast and robust crowd-powered component in interactive systems, particularly dialogue systems, to extract key information from user utterances on the fly. Our experiments on Amazon Mechanical Turk using the Airline Travel Information System (ATIS) dataset showed that the proposed approach achieves high-quality results with **an average response time shorter than 9 seconds.**

## Worker Interface

![Dialogue ESP Game Interface](https://c1.staticflickr.com/3/2866/34005041255_a3aefed546_b.jpg)

An example source code of our worker interface is in the following folder:

```
dialogue-esp-game/web-interface/
```

### URL Parameters

```timeInSec```: The **time limit** of each game (in seconds). Default = 20.

### Notes

- This code is *off-the-shelf* ready. You can download the code and open ```ESP-AMT.html``` with any web browser to play with it. We also host a **[live demo here](https://www.cs.cmu.edu/~tinghaoh/project/dialog_esp_game/demo/ESP-AMT.html)**.

- For programmatical use, the code only requires **jQuery 1.7.2**. Feel free to upgrade it to some (much) newer versions.

- This example code does **not** contain any ajax functions nor back-end codes that connect to the database.

## Data: Messages That Contain Food Entities

In the Experiment 2 of our paper, we conducted lab-based user experiments to evaluate the proposed technology on extracting **"food"** entities. The end-to-end system is called *Eatity*.

The following .csv file contains the data we collected in Expetiment 2.

```
dialogue-esp-game/data/eatity-exp-data.csv
```

The detailed description of the user study, which was not included in the paper, is described in the follwoing subsections.

### Scenarios 

Ten Google Hangouts users enter our lab with their own laptops.
We first ask them to arbitrarily create a list 9 foods, 3 drinks, and 3 countries based on their own preferences.
Then we explain the purpose of the experiments, and introduce five scenarios of using instant messaging:


- **Eat:**
  You discuss with your friend about what to eat later. (Your friend is not necessarily in the same location as you.)
- **Drink:**
  You discuss with an employee a coffee place, bar, or restaurant to order something to drink.
- **Cook:**
  You plan to cook later. You discuss the details with your friend who knows how to cook.
- **Chat:**
  You are chatting with your friend.
- **No Food:**
        You are chatting with your friend.
        You do not mention food.
        Instead, you mention a country name.

### Conversational Acts

We also list three types of conversational acts which could emerge in each scenario:

- **Question:**
        Ask a question.
- **Answer:**
        Answer a question that could be asked under the current scenario.
        Imagine a question that could be asked in the given scenario,
        and answer that question.
- **Mentioning:**
        Naturally converse without asking or answering any specific questions. 
        Any words could be said in the given scenario, without the context of question-answering.

Using their laptops, users send one text chat for each combination of [scenario, conversational act] to our chatbot, i.e., 15 chats in total.
In the Eat, Cook, and Chat scenarios, users must mention one of the foods they listed earlier;
in the Drink scenario, they must mention one of the drinks they listed.
In the No Food scenario, users must mention one of the countries they listed, and no food names can be mentioned.
In total, we collect 150 chat inputs from 10 user experiments.
Correspondingly, instructions on the workers' interface is modified as *"What is the ```food_name``` in this dialog?"*,
and the explanation of ```food_name``` is modified as *"Food name. The full name of the food. Including any drinks or beverages."*
In the experiments, our chatbot post 120 HITs with a lifetime of 60 seconds to MTurk upon receiving a text chat.
The price of each HIT is $0.1. (Rate = $18 per hour.)
We use the interface shown above with a time constraint of 20 seconds. 




## How to Cite this Work

```
@INPROCEEDINGS {dialog-esp-game,
    author    = "Huang, Ting-Hao K. and Chen, Yun-Nung and Bigham, Jeffrey P.",
    title     = "Real-time On-Demand Crowd-powered Entity Extraction",
    booktitle = "Proceedings of the 5th Edition Of The Collective Intelligence Conference (CI 2017)",
    year      = "2017",
    address   = "New York University, NY, USA",
    month     = "jun",
    note      = "Oral presentation"
}
```
