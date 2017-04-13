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
web-interface/
```

### URL Parameters

```timeInSec```: The **time limit** of each game (in seconds). Default = 20.

### Notes

- This code is *off-the-shelf* ready. You can download the code and open ```ESP-AMT.html``` with any web browser to play with it. We also host a **[live demo] (https://www.cs.cmu.edu/~tinghaoh/project/dialog_esp_game/demo/ESP-AMT.html)**.

- For programmatical use, our code only requires **jQuery 1.7.2**. Feel free to upgrate it to some (much) newer versions.

- This example code does **not** contain any ajax functions and back-end code that connects to the database.

- 





## Data




## How to Cite

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
