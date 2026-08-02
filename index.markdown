---
layout: home
---

## Research interests

### Differential privacy

A mathematical definition that lets you quantify how private a randomized
algorithm is. For any two neighbouring datasets $$D \sim D'$$ differing in a
single user, a randomized algorithm $$\mathcal{M}$$ is $$\varepsilon$$-differentially
private if

$$
\text{Pr}[\mathcal{M}(D) = y] \leq e^\varepsilon\, \text{Pr}[\mathcal{M}(D') = y].
$$

It is a measure of divergence between two probability distributions — a max
divergence. The intuition: by upper bounding the divergence between the outputs
on $$D$$ and on $$D'$$, no adversary can reliably distinguish the two, which
makes a single user's contribution effectively private. This is usually achieved
by masking the true statistics with additive noise, which is where the
privacy–utility trade-off comes from.

### Randomized algorithms and data structures

Did you know that if you have an algorithm succeeding with probability strictly
greater than $$1/2$$, it is enough to run it independently $$O(\log n)$$ times
and take the majority answer to succeed with probability $$1 - O(1/n)$$?

That is a standard concentration-of-measure result, and it is the foundational
trick behind many randomized algorithms — the Count-Min sketch among them, which
computes frequencies over a data stream in constant space.

### Probability and statistics

Did you know that if you draw $$N$$ independent samples from a standard normal
distribution, their maximum is remarkably predictable? As $$N$$ grows, the
maximum concentrates sharply around $$\sqrt{2 \log N}$$, and the fluctuations
around that value shrink at a rate of $$O(1/\sqrt{\log N})$$. The phenomenon is
called **super-concentration**: the variance vanishes as the number of random
variables grows.

This is a standard result of **extreme value theory**, a tool I used extensively
in joint work with my supervisors,
[Differentially Private High-Dimensional Approximate Range Counting, Revisited](https://drops.dagstuhl.de/entities/document/10.4230/LIPIcs.FORC.2025.15).

### Deep learning

Did you know that training a machine learning model on private data is risky
because of **memorization**? Generative models can regurgitate private data if
no precautions are taken. One way to mitigate this is **differentially private
training**, adding noise to stochastic gradient descent:

$$
\theta_{t+1} = \theta_t - \eta \frac{1}{L}\bigg(\sum_{i \in B}\text{clip}_C\big(\nabla_\theta \mathcal{L}(\theta_t, x_t)\big) + \mathcal{N}(0, \sigma^2 C^2 \mathbf{I})\bigg).
$$

A summary of the state of the art (up to 2024) is in my project report,
[The Privacy Analysis of the Differentially Private Stochastic Gradient Descent](/documents/The_Privacy_Analysis_of_the_Differential_Private_Stochastic_Gradient_Descent.pdf).
Well-known libraries wrap TensorFlow and PyTorch for private training —
[Opacus](https://opacus.ai) is one of them.

### Earlier interests

**Complex systems** (MSc thesis in economic complexity) · **mobility data
science** (PhD collaboration with [Motion Analytica](https://www.motionanalytica.com))
· **quantum computing** · **statistical physics**.

## Experience

### AIoT Researcher — Havguard AS, Oslo

Engineering and adapting predictive algorithms in C++ for resource-constrained
environments, with a focus on high performance and system stability. 

### Visiting PhD student — IT University of Copenhagen, 2024

Worked with [Rasmus Pagh](https://rasmuspagh.net) as part of the
[Providentia project](https://www.rasmuspagh.net/providentia/), together with my
co-supervisor [Martin Aumüller](https://itu.dk/~maau/).

### Industry collaboration — Motion Analytica

PhD research collaboration on mobility research with [Motion Analytica](https://www.motionanalytica.com/en/homepage-en/).
Our joint work was recently published in a
[peer-reviewed journal](https://www.mdpi.com/2412-3811/11/1/4).

### Background

Before the PhD I studied **theoretical physics** at the University of Padova,
which is where the mathematical foundation for my work on randomized algorithms
comes from.

## Beyond the lab

- **Hiking.** I am a hiking guide assistant for
  [The South Adventure](https://www.thesouthadventures.com). I recently
  completed the Annapurna Circuit in Nepal, reaching 5 400 m, and hiked Jbel
  Toubkal, the highest mountain in North Africa.
- **Music.** I play bass, guitar and a bit of piano. I was part of a band and
  contributed to the album [*L'assenzio*](https://open.spotify.com/artist/1EdsoinReRAdUfCfRqDvzm).
- **Composition.** I write and produce music — some tracks are on
  [SoundCloud](https://soundcloud.com/user-373535867).
- **Fitness.** I love calisthenics.
